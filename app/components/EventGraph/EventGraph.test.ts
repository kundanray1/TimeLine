import { DisplayItem, generateDisplayItems } from "./EventGraph";

describe('EventGraph component', () => {
  describe('generateDisplayItems function', () => {
    it('should return an array of DisplayItem with event data populated', () => {
      const eventItems: { timestamp: string; event: string }[] = [
        { timestamp: '12345', event: 'up' },
        { timestamp: '67890', event: 'down' },
      ];

      const expectedDisplayItems: DisplayItem[] = [
        { hour: '1718493120000', event: 'down', hasVerticalLine: false },
        { hour: '1718514720000', event: 'down', hasVerticalLine: false },
        // ... (hours skipped for brevity)
        { hour: '1718526000000', event: 'up', hasVerticalLine: false },
        { hour: '1718537400000', event: 'down', hasVerticalLine: true }, // Vertical line due to state change
        // ... (hours skipped for brevity)
      ];

      const actualDisplayItems = generateDisplayItems(eventItems);

      // Check length and basic structure
      expect(actualDisplayItems).toHaveLength(24);
      expect(actualDisplayItems[0]).toEqual({ hour: '1718493120000', event: null, hasVerticalLine: false });

      // Check specific event data for relevant hours
      expect(actualDisplayItems[12]).toEqual({ hour: '1718526000000', event: 'up', hasVerticalLine: false });
      expect(actualDisplayItems[13]).toEqual({ hour: '1718537400000', event: 'down', hasVerticalLine: true });
    });

    it('should handle missing events and inherit from previous hour', () => {
      const eventItems: { timestamp: string; event: string }[] = [{ timestamp: '12345', event: 'up' }];

      const expectedDisplayItems: DisplayItem[] = [
        { hour: '1718493120000', event: 'down', hasVerticalLine: false },
        { hour: '1718514720000', event: 'down', hasVerticalLine: false },
        // ... (hours skipped for brevity)
        { hour: '1718526000000', event: 'up', hasVerticalLine: false },
        { hour: '1718537400000', event: 'up', hasVerticalLine: false }, // Inherited from previous hour
        // ... (hours skipped for brevity)
      ];

      const actualDisplayItems = generateDisplayItems(eventItems);

      expect(actualDisplayItems[13]).toEqual({ hour: '13', event: 'up', hasVerticalLine: false });
    });

    // Add more test cases here to cover different scenarios (e.g., multiple events per hour, edge cases)
  });
});