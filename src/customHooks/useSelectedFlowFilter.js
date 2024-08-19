import { useState, useEffect } from 'react';
import { parse, format } from 'date-fns';
import isWithinInterval from 'date-fns/isWithinInterval';

const useSelectedFlowFilter = (contacts, predefinedOrder, startDate, endDate) => {
  const [filteredContacts, setFilteredContacts] = useState(contacts);

  useEffect(() => {
    setFilteredContacts(contacts); // Initialize with all contacts
  }, [contacts]);

  const parseCreatedAt = (dateString) => {
    return parse(dateString, 'dd/MM/yyyy, HH:mm', new Date());
  };

  const handleFlowChange = (selectedFlow) => {
    console.log('Flow changed:', selectedFlow);

    // If 'Ninguno' is selected, reset to all contacts
    if (selectedFlow === 'ninguno') {
      console.log('Ninguno selected');
      setFilteredContacts(contacts);
      return;
    }

    let filtered = contacts;

    // Filter contacts based on the selected flow
    filtered = filtered.filter(contact => {
      // If selected flow is in predefinedOrder
      if (predefinedOrder.includes(selectedFlow)) {
        const flowValues = contact.values.filter(value => value.lastFlow === selectedFlow);

        const validFlowValues = flowValues.filter(value => value.lastProduct !== '-' && value.lastProduct !== undefined);

        if (validFlowValues.length > 0) {
          // Get the latest flow value based on creation date
          const latestFlowValue = validFlowValues.reduce((latest, current) => {
            const latestDate = new Date(latest.createdAt);
            const currentDate = new Date(current.createdAt);
            return currentDate > latestDate ? current : latest;
          }, validFlowValues[0]);

          return latestFlowValue.lastFlow === selectedFlow;
        }

        // Ensure that the contact matches the selected flow and has a valid last product
        return contact.lastFlow === selectedFlow && contact.lastProduct !== '-' && contact.lastProduct !== undefined;
      } else {
        // For flows not in predefinedOrder, only show if lastProduct is valid
        return contact.values.some(
          value => value.lastFlow === selectedFlow && value.lastProduct !== '-' && value.lastProduct !== undefined
        );
      }
    });

    // Apply date range filter if dates are set
    if (startDate && endDate) {
      const parsedStartDate = parse(format(startDate, 'dd/MM/yyyy, HH:mm'), 'dd/MM/yyyy, HH:mm', new Date());
      const parsedEndDate = parse(format(endDate, 'dd/MM/yyyy, HH:mm'), 'dd/MM/yyyy, HH:mm', new Date());

      filtered = filtered.filter(contact => {
        const contactDate = parseCreatedAt(contact.createdAt);
        return isWithinInterval(contactDate, { start: parsedStartDate, end: parsedEndDate });
      });
    }

    // Update the state with the filtered contacts
    setFilteredContacts(filtered);
  };

  return {
    filteredContacts,
    handleFlowChange,
  };
};

export default useSelectedFlowFilter;
