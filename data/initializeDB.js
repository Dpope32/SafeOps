import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('safeops.db');

export const initializeDatabase = () => {
  console.log('Initializing database...');
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS codes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        code TEXT UNIQUE NOT NULL,
        title TEXT,
        description TEXT,
        details TEXT
      );`,
      [],
      () => {
        console.log('Table "codes" created or already exists.');
      },
      (_, error) => {
        console.log('Error creating table:', error);
      }
    );

    // Prepare bulk insert
    const insertQuery = `INSERT OR IGNORE INTO codes (code, title, description, details) VALUES (?, ?, ?, ?);`;
    const sampleData = [
      {
        code: '1234',
        title: 'Forklift Operation',
        description: 'Instructions for operating the forklift.',
        details:
          'Ensure the forklift is inspected before use. Follow all safety protocols. Always wear a helmet and high-visibility vest.',
      },
      // Add more sample codes as needed
      {
        code: '5678',
        title: 'Pallet Stacking',
        description: 'Guidelines for stacking pallets safely.',
        details:
          'Stack pallets no higher than 5 units. Ensure stability before moving. Use proper lifting techniques.',
      },
      {
        code: '9012',
        title: 'Safety Gear',
        description: 'Information about required safety gear.',
        details:
          'Always wear safety helmets, gloves, and reflective vests in the warehouse. Safety shoes are mandatory.',
      },
      {
        code: '3456',
        title: 'Emergency Procedures',
        description: 'Steps to follow in case of an emergency.',
        details:
          'In the event of a fire, evacuate immediately and contact the safety officer. Follow the marked exit routes.',
      },
      {
        code: '7890',
        title: 'Loading Dock Operations',
        description: 'Best practices for loading and unloading.',
        details:
          'Ensure the dock leveler is secure before use. Check for any obstructions. Communicate clearly with the driver.',
      },
      {
        code: '2345',
        title: 'Inventory Management',
        description: 'Procedures for managing inventory.',
        details:
          'Use the barcode scanner for all inventory movements. Update the system in real-time to maintain accuracy.',
      },
      {
        code: '6789',
        title: 'Equipment Maintenance',
        description: 'Routine maintenance tasks for equipment.',
        details:
          'Perform daily inspections on all machinery. Report any malfunctions to the maintenance team immediately.',
      },
      {
        code: '0123',
        title: 'Warehouse Cleanliness',
        description: 'Maintaining a clean and organized warehouse.',
        details:
          'Dispose of waste materials properly. Keep aisles clear and free from hazards. Regularly sanitize workstations.',
      },
      {
        code: '4567',
        title: 'Order Picking',
        description: 'Efficiently picking orders for shipment.',
        details:
          'Follow the optimized picking routes. Double-check items against the order list. Pack items securely.',
      },
      {
        code: '8901',
        title: 'Shipping Procedures',
        description: 'Steps to prepare orders for shipping.',
        details:
          'Verify shipping addresses before dispatch. Use appropriate packaging materials. Label all packages clearly.',
      },
      {
        code: '1357',
        title: 'Receiving Shipments',
        description: 'Processing incoming shipments.',
        details:
          'Inspect all incoming goods for damage. Update inventory records upon receipt. Communicate discrepancies immediately.',
      },
      {
        code: '2468',
        title: 'Hazard Communication',
        description: 'Handling and communicating hazards.',
        details:
          'Use proper signage for hazardous materials. Train employees on hazard identification and response procedures.',
      },
    ];

    sampleData.forEach((item) => {
      tx.executeSql(
        insertQuery,
        [item.code, item.title, item.description, item.details],
        () => {
          console.log(`Inserted code ${item.code} successfully.`);
        },
        (_, error) => {
          console.log(`Error inserting code ${item.code}:`, error);
        }
      );
    });
  });
};

export const getCodeDetails = (code, successCallback, errorCallback) => {
  console.log(`Fetching details for code: ${code}`);
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM codes WHERE code = ?;',
      [code],
      (_, { rows }) => {
        if (rows.length > 0) {
          console.log('Code found:', rows._array[0]);
          successCallback(rows._array[0]);
        } else {
          console.log('Code not found.');
          errorCallback('Code not found.');
        }
      },
      (_, error) => {
        console.log('Error fetching code details:', error);
        errorCallback(error.message);
      }
    );
  });
};
