import { Compiler, WebpackPluginInstance } from 'webpack';
import { writeFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import zlib from 'zlib';

interface BuildStatsPluginOptions {
  outputPath?: string;
}

interface FileStats {
  fileName: string;
  size: number;
  gzippedSize: number;
  brotliSize: number;
  contentType: string;
}

interface CompleteStats {
  files: FileStats[];
  totalSize: number;
  totalGzippedSize: number;
  totalBrotliSize: number;
  noOfFiles: number;
  largestFile: FileStats | null;
  buildDuration: number;
}

class BuildStatsPlugin implements WebpackPluginInstance {
  outputPath: string;

  startTime: number;

  stats: CompleteStats;

  constructor(options: BuildStatsPluginOptions) {
    this.outputPath = options.outputPath ?? 'bundle-stats.json';
    this.startTime = 0;
    this.stats = {
      files: [],
      totalSize: 0,
      totalGzippedSize: 0,
      totalBrotliSize: 0,
      noOfFiles: 0,
      largestFile: null,
      buildDuration: 0,
    };
  }

  apply(compiler: Compiler) {
    compiler.hooks.beforeCompile.tap('BuildStatsPlugin', () => {
      this.startTime = Date.now();
    });
    compiler.hooks.done.tap('BuildStatsPlugin', () => {
      // Calculate build duration
      this.stats.buildDuration = Date.now() - this.startTime;

      // Ensure the directory exists
      mkdirSync(dirname(this.outputPath), { recursive: true });
      writeFileSync(this.outputPath, JSON.stringify(this.stats, null, 2));
    });
    compiler.hooks.emit.tapAsync(
      'BuildStatsPlugin',
      (compilation, callback) => {
        Object.keys(compilation.assets)
          .filter(
            fileName => !fileName.endsWith('.map') && !fileName.endsWith('.br'),
          )
          .forEach(fileName => {
            const asset = compilation.assets[fileName];
            const size = asset.size();
            const gzippedSize = zlib.gzipSync(asset.source())?.length;
            const brotliSize = zlib.brotliCompressSync(asset.source())?.length;

            let contentType = 'asset';
            compilation.chunkGroups.forEach(chunkGroup => {
              chunkGroup.chunks.forEach(chunk => {
                if (chunk.files.has(fileName)) {
                  contentType = 'chunk';
                }
              });
            });

            this.stats.files.push({
              fileName,
              size,
              gzippedSize,
              brotliSize,
              contentType,
            });

            this.stats.totalSize += size;
            this.stats.totalGzippedSize += gzippedSize;
            this.stats.totalBrotliSize += brotliSize;
          });

        this.stats.noOfFiles = this.stats.files?.length;

        if (this.stats.files?.length > 0) {
          this.stats.files = this.stats.files.map(i => ({
            ...i,
            percentageBySize: ((i.size / this.stats.totalSize) * 100).toFixed(
              2,
            ),
          }));
          this.stats.largestFile = this.stats.files.reduce(
            (prev, current) => (prev.size > current.size ? prev : current),
            this.stats.files[0],
          );
        }

        callback();
      },
    );
  }
}

export { BuildStatsPlugin };
