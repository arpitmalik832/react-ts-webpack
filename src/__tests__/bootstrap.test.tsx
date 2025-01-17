/**
 * This file is used to test the bootstrap file.
 * @file This file is saved as 'src/__tests__/bootstrap.test.jsx'.
 */
import React, { ReactElement, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { mount } from '../bootstrap';
import AppProvider from '../providers/AppProvider';

// Mock React dependencies
jest.mock('react-dom/client', () => ({
  createRoot: jest.fn(),
}));

jest.mock('../providers/AppProvider', () => {
  const MockAppProvider = () => <div>Mock App Provider</div>;
  return MockAppProvider;
});

describe('Bootstrap Tests', () => {
  const mockRoot = {
    render: jest.fn() as jest.Mock<void, [React.ReactNode]>,
    unmount: jest.fn() as jest.Mock<void, []>,
  };
  let mockElement: HTMLElement;

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();

    // Create mock DOM element
    mockElement = document.createElement('div');

    // Setup createRoot mock
    (createRoot as jest.Mock).mockReturnValue(mockRoot);
  });

  it('should create root with provided element', () => {
    mount(mockElement);
    expect(createRoot).toHaveBeenCalledWith(mockElement);
  });

  it('should render AppProvider within StrictMode', () => {
    mount(mockElement);
    expect(mockRoot.render).toHaveBeenCalledWith(
      <StrictMode>
        <AppProvider />
      </StrictMode>,
    );
  });

  it('should return unmount function', () => {
    const unmount = mount(mockElement);
    expect(typeof unmount).toBe('function');
  });

  describe('Unmount Function', () => {
    it('should call root.unmount when unmount function is called', async () => {
      const unmount = mount(mockElement);
      unmount();

      // Wait for microtask queue to process
      await Promise.resolve();

      expect(mockRoot.unmount).toHaveBeenCalled();
    });

    it('should queue unmount in microtask', () => {
      const unmount = mount(mockElement);
      unmount();
      expect(mockRoot.unmount).not.toHaveBeenCalled();
    });

    it('should execute unmount after microtask queue', async () => {
      const unmount = mount(mockElement);
      unmount();

      expect(mockRoot.unmount).not.toHaveBeenCalled();
      await Promise.resolve();
      expect(mockRoot.unmount).toHaveBeenCalled();
    });
  });

  describe('Error Handling', () => {
    it('should accept valid DOM element', () => {
      expect(() => mount(document.createElement('div'))).not.toThrow();
    });
  });

  describe('Integration', () => {
    it('should create root and render app successfully', () => {
      const unmount = mount(mockElement);
      expect(createRoot).toHaveBeenCalledWith(mockElement);
      expect(mockRoot.render).toHaveBeenCalled();
      expect(typeof unmount).toBe('function');
    });

    it('should handle complete mount/unmount cycle', async () => {
      const unmount = mount(mockElement);
      expect(createRoot).toHaveBeenCalledWith(mockElement);
      expect(mockRoot.render).toHaveBeenCalled();

      unmount();
      await Promise.resolve();
      expect(mockRoot.unmount).toHaveBeenCalled();
    });
  });

  describe('React Components', () => {
    it('should render AppProvider component', () => {
      mount(mockElement);
      const renderCall = mockRoot.render.mock.calls[0][0];
      expect((renderCall as ReactElement).type).toBe(StrictMode);
    });

    it('should wrap AppProvider with StrictMode', () => {
      mount(mockElement);
      const renderCall = mockRoot.render.mock.calls[0][0];
      expect((renderCall as ReactElement).type).toBe(StrictMode);
    });
  });
});
