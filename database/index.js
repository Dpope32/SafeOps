// database/index.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const CODES_KEY = 'safeops_codes';

export const initializeDatabase = async () => {
  try {
    const existingData = await AsyncStorage.getItem(CODES_KEY);
    if (!existingData) {
        const sampleData = [
            { code: '1XX', title: 'General', description: 'Chemical Emergency', details: 'Chemical Emergency Alert' },
            { code: '2XX', title: 'General', description: 'Fire', details: 'Fire Alert' },
            { code: '3XX', title: 'General', description: 'Smoke/Heat', details: 'Smoke or Heat Detected' },
            { code: '4XX', title: 'General', description: 'Water Flow', details: 'Water Flow Detected' },
            { code: 'XX', title: 'General', description: 'Area', details: 'Area Alert' },
            { code: '511', title: 'General', description: 'All Clear', details: 'All Clear Alert' },
            { code: '522', title: 'General', description: 'Medical Emergency', details: 'Medical Emergency Alert' },
            { code: '533', title: 'General', description: 'Severe Weather', details: 'Severe Weather Alert' },
            { code: '544', title: 'General', description: 'Chemical Emergency', details: 'Chemical Emergency Alert' },
            { code: '555', title: 'General', description: 'Mill Evacuation', details: 'Mill Evacuation Alert' },
            { code: '566', title: 'General', description: 'Mill Lockdown', details: 'Mill Lockdown Alert' },
            { code: '111', title: 'General', description: 'Active Assailant', details: 'Active Assailant Alert' },
            { code: '21', title: 'MCC', description: 'MCC Rm. F-18.5 131', details: 'Location MCC Room F-18.5 131' },
            { code: '23', title: 'MCC', description: 'North MCC Rm. 151', details: 'Location North MCC Room 151' },
            { code: '25/35', title: 'MCC', description: 'Admin MCC Rm. 31', details: 'Location Admin MCC Room 31' },
            { code: '32', title: 'MCC', description: 'MCC Rm. 2nd FL. 132', details: 'Location MCC Room 2nd Floor 132' },
            { code: '33', title: 'MCC', description: 'MCC Rm. 151', details: 'Location MCC Room 151' },
            { code: '43', title: 'MCC', description: 'SWGR Rm. 111', details: 'Location SWGR Room 111' },
            { code: 'X11', title: 'J1', description: 'Interface', details: 'Interface Area' },
            { code: 'X12', title: 'J1', description: 'J1 TM Basement', details: 'J1 TM Basement Area' },
            { code: 'X13', title: 'J1', description: 'J1 Tissue Machine', details: 'J1 Tissue Machine Area' },
            { code: 'X14', title: 'J1', description: 'J1 Fiberizing', details: 'J1 Fiberizing Area' },
            { code: 'X15', title: 'J1', description: 'J1 Fiber Storage', details: 'J1 Fiber Storage Area' },
            { code: 'X16', title: 'J1', description: 'J1 Control Room', details: 'J1 Control Room Area' },
            { code: 'X21', title: 'J1', description: 'Interior Acid Building', details: 'Interior Acid Building Area' },
            { code: 'X22', title: 'J1', description: 'Exterior Acid Building', details: 'Exterior Acid Building Area' },
            { code: 'X23', title: 'J1', description: 'Shipping/Receiving', details: 'Shipping and Receiving Area' },
            { code: 'X24', title: 'J1', description: 'Utilities', details: 'Utilities Area' },
            { code: 'X25', title: 'J1', description: 'J1 TM HVAC 2nd Fl. Mezz', details: 'J1 TM HVAC 2nd Floor Mezzanine' },
            { code: 'X26', title: 'J1', description: 'Chemical Acid Building', details: 'Chemical Acid Building Area' },
            { code: 'X31', title: 'J1', description: 'J1 TM 3rd Fl. Mezz', details: 'J1 TM 3rd Floor Mezzanine' },
            { code: 'X32', title: 'J1', description: 'Heavy Shop', details: 'Heavy Shop Area' },
            { code: 'X33', title: 'J1', description: 'J1 Deluge', details: 'J1 Deluge Area' },
            { code: 'X34', title: 'J1', description: 'Cafeteria/Kitchen', details: 'Cafeteria and Kitchen Area' },
            { code: 'X35', title: 'J1', description: 'Admin Center', details: 'Admin Center Area' },
            { code: 'X36', title: 'J1', description: 'Stores', details: 'Stores Area' },
            { code: 'X41', title: 'J1', description: 'Conv. Line 1', details: 'Conveyor Line 1' },
            { code: 'X42', title: 'J1', description: 'Conv. Line 2', details: 'Conveyor Line 2' },
            { code: 'X43', title: 'J1', description: 'Conv. Line 3', details: 'Conveyor Line 3' },
            { code: 'X44', title: 'J1', description: 'Conv. Line 4', details: 'Conveyor Line 4' },
            { code: 'X45', title: 'J1', description: 'Conv. Line 5', details: 'Conveyor Line 5' },
            { code: 'X46', title: 'J1', description: 'J1 Roll storage', details: 'J1 Roll Storage Area' },
            { code: 'X51', title: 'J1', description: 'Diesel Pump Hse. 1', details: 'Diesel Pump House 1' },
            { code: 'X52', title: 'J1', description: 'Diesel Pump Hse. 2', details: 'Diesel Pump House 2' },
            { code: 'X53', title: 'J1', description: 'Waste Water', details: 'Waste Water Area' },
            { code: 'X54', title: 'J1', description: 'Lube building', details: 'Lubrication Building' },
            { code: 'X55', title: 'J1', description: 'Interior Caustic Bldg', details: 'Interior Caustic Building' },
            { code: 'X56', title: 'J1', description: 'Exterior Caustic Bldg', details: 'Exterior Caustic Building' },
            { code: 'X61', title: 'J1', description: 'AHU Conv. Line 1&2', details: 'Air Handling Unit for Conveyor Lines 1 and 2' },
            { code: 'X62', title: 'J1', description: 'AHU Conv. Line 3&4', details: 'Air Handling Unit for Conveyor Lines 3 and 4' },
            { code: 'X63', title: 'J1', description: 'AHU Conv. Line 5', details: 'Air Handling Unit for Conveyor Line 5' },
            { code: 'X64', title: 'J1', description: 'Bleach Tank', details: 'Bleach Tank Area' },
            { code: '2161', title: 'J2', description: 'Chemical Unload Area', details: 'Chemical Unload Area' },
            { code: '2211', title: 'J2', description: 'Pull J2 TM Basement', details: 'Pull J2 Tissue Machine Basement' },
            { code: '2212', title: 'J2', description: 'Pull Training Center', details: 'Pull Training Center Area' },
            { code: '2214', title: 'J2', description: 'Pull J2 Mezz MCC Rm', details: 'Pull J2 Mezzanine MCC Room' },
            { code: '2216', title: 'J2', description: 'Pull J2 Facility Services Bldg', details: 'Pull J2 Facility Services Building' },
            { code: '2221', title: 'J2', description: 'Pull J2 Broke Storage Area', details: 'Pull J2 Broke Storage Area' },
            { code: '2223', title: 'J2', description: 'Pull J2 Dry End MCC Rm', details: 'Pull J2 Dry End MCC Room' },
            { code: '2225', title: 'J2', description: 'Pull J2 Switchgear Rm', details: 'Pull J2 Switchgear Room' },
            { code: '2231', title: 'J2', description: 'Pull J2 Wet End MCC Rm', details: 'Pull J2 Wet End MCC Room' },
            { code: '2233', title: 'J2', description: 'Pull J2 Vacuum Rm', details: 'Pull J2 Vacuum Room' },
            { code: '2234', title: 'J2', description: 'Pull J2 Kymene building', details: 'Pull J2 Kymene Building' },
            { code: '2235', title: 'J2', description: 'Pull J2 Conv. Line 11 & 12', details: 'Pull J2 Conveyor Lines 11 and 12' },
            { code: '2241', title: 'J2', description: 'Pull J2 Conv. Line 9 & 10', details: 'Pull J2 Conveyor Lines 9 and 10' },
            { code: '2242', title: 'J2', description: 'Flow J2 Conv. Line 9 & 10', details: 'Flow J2 Conveyor Lines 9 and 10' },
            { code: '2243', title: 'J2', description: 'Pull J2 Conv. Line 6 & 7', details: 'Pull J2 Conveyor Lines 6 and 7' },
            { code: '2245', title: 'J2', description: 'Pull FPW Zone 1', details: 'Pull FPW Zone 1 Area' },
            { code: '2251', title: 'J2', description: 'Pull FPW Zone 2', details: 'Pull FPW Zone 2 Area' },
            { code: '2253', title: 'J2', description: 'Pull FPW Zone 3', details: 'Pull FPW Zone 3 Area' },
            { code: '2261', title: 'J2', description: 'Pull OLU Equipment', details: 'Pull OLU Equipment Area' },
            { code: '2262', title: 'J2', description: 'Pull OLU Machine Area', details: 'Pull OLU Machine Area' },
            { code: '2263', title: 'J2', description: 'Pull OLU Roll Storage', details: 'Pull OLU Roll Storage Area' },
            { code: '2311', title: 'J2', description: 'J2 Switch Room', details: 'J2 Switch Room' },
            { code: '2312', title: 'J2', description: 'Smoke J2 West Mezz', details: 'Smoke Detected J2 West Mezzanine' },
            { code: '2313', title: 'J2', description: 'Smoke J2 East Mezz', details: 'Smoke Detected J2 East Mezzanine' },
            { code: '2314', title: 'J2', description: 'Smoke Training Center', details: 'Smoke Detected Training Center' },
            { code: '2315', title: 'J2', description: 'Smoke J2 Mezz MCC Rm', details: 'Smoke Detected J2 Mezzanine MCC Room' },
            { code: '2322', title: 'J2', description: 'Smoke J-2 TAD MCC', details: 'Smoke Detected J-2 TAD MCC' },
            { code: '2324', title: 'J2', description: 'Smoke J2 Dry End MCC Rm', details: 'Smoke Detected J2 Dry End MCC Room' },
            { code: '2326', title: 'J2', description: 'Smoke J2 Switchgear Room', details: 'Smoke Detected J2 Switchgear Room' },
            { code: '2332', title: 'J2', description: 'Smoke J2 Wet End MCC Rm', details: 'Smoke Detected J2 Wet End MCC Room' },
            { code: '2356', title: 'J2', description: 'Smoke FPW East MCC Rm', details: 'Smoke Detected FPW East MCC Room' },
            { code: '2413', title: 'J2', description: 'Flow J2 East Mezz.', details: 'Flow Detected J2 East Mezzanine' },
            { code: '2422', title: 'J2', description: 'Flow J2 Broke Storage Area', details: 'Flow Detected J2 Broke Storage Area' },
            { code: '2423', title: 'J2', description: 'Flow J2 TM Reel Deluge', details: 'Flow Detected J2 Tissue Machine Reel Deluge' },
            { code: '2434', title: 'J2', description: 'Flow J2 Vacuum Room', details: 'Flow Detected J2 Vacuum Room' },
            { code: '2436', title: 'J2', description: 'Flow J2 Conv. Line 11 & 12', details: 'Flow Detected J2 Conveyor Lines 11 and 12' },
            { code: '2444', title: 'J2', description: 'Flow J2 Conv. Line 6 & 7', details: 'Flow Detected J2 Conveyor Lines 6 and 7' },
            { code: '2446', title: 'J2', description: 'Flow FPW Zone 1', details: 'Flow Detected FPW Zone 1' },
            { code: '2452', title: 'J2', description: 'Flow FPW Zone 2', details: 'Flow Detected FPW Zone 2' },
            { code: '2454', title: 'J2', description: 'Flow FPW Zone 3', details: 'Flow Detected FPW Zone 3' },
            { code: '2462', title: 'J2', description: 'Flow OLU Area', details: 'Flow Detected OLU Area' },
            { code: '3211', title: 'Fusion Building', description: 'Pull SE Corner Fusion Bldg', details: 'Pull Station Southeast Corner Fusion Building' },
            { code: '3212', title: 'Fusion Building', description: 'Pull South Central Fusion Bldg', details: 'Pull Station South Central Fusion Building' },
            { code: '3213', title: 'Fusion Building', description: 'Pull SW Corner Fusion Bldg', details: 'Pull Station Southwest Corner Fusion Building' },
            { code: '3214', title: 'Fusion Building', description: 'Pull West Central Fusion Bldg', details: 'Pull Station West Central Fusion Building' },
            { code: '3215', title: 'Fusion Building', description: 'Pull NW Corner Fusion Bldg', details: 'Pull Station Northwest Corner Fusion Building' },
            { code: '3216', title: 'Fusion Building', description: 'Pull Fusion Bldg Mezz.', details: 'Pull Station Fusion Building Mezzanine' },
            { code: '3311', title: 'Fusion Building', description: 'Fire door 20 Fusion Bldg', details: 'Fire Door 20 Fusion Building' },
            { code: '3312', title: 'Fusion Building', description: 'Fire door 21 Fusion Bldg', details: 'Fire Door 21 Fusion Building' },
            { code: '3313', title: 'Fusion Building', description: 'AHU Supply', details: 'Air Handling Unit Supply' },
            { code: '3314', title: 'Fusion Building', description: 'AHU Return', details: 'Air Handling Unit Return' },
            { code: '3411', title: 'Fusion Building', description: 'Flow R-43 Fusion Bldg', details: 'Flow Detected R-43 Fusion Building' },
            { code: '3221', title: 'Security Center', description: 'Pull Entry Doors', details: 'Pull Station Entry Doors' },
            { code: '3321', title: 'Security Center', description: 'Smoke', details: 'Smoke Detected in Security Center' },
            { code: '4211', title: 'Tungsten Building', description: 'Pull station SW wall', details: 'Pull Station Southwest Wall' },
            { code: '4213', title: 'Tungsten Building', description: 'Pull station Log saw', details: 'Pull Station Log Saw Area' },
            { code: '4221', title: 'Tungsten Building', description: 'Pull station East door', details: 'Pull Station East Door' },
            { code: '4222', title: 'Tungsten Building', description: 'Pull station NW wall', details: 'Pull Station Northwest Wall' },
            { code: '4223', title: 'Tungsten Building', description: 'Pull station by MCC', details: 'Pull Station by MCC' },
            { code: '4224', title: 'Tungsten Building', description: 'Pull station South wall', details: 'Pull Station South Wall' },
            { code: '4225', title: 'Tungsten Building', description: 'Pull station N central area', details: 'Pull Station North Central Area' },
            { code: '4231', title: 'Tungsten Building', description: 'Pull station North wall', details: 'Pull Station North Wall' },
            { code: '4232', title: 'Tungsten Building', description: 'Pull station NE wall', details: 'Pull Station Northeast Wall' },
            { code: '4233', title: 'Tungsten Building', description: 'Pull station Mezz', details: 'Pull Station Mezzanine' },
            { code: '4234', title: 'Tungsten Building', description: 'Pull station S central area', details: 'Pull Station South Central Area' },
            { code: '4311', title: 'Tungsten Building', description: 'Smoke Air compressor', details: 'Smoke Detected in Air Compressor Area' },
            { code: '4312', title: 'Tungsten Building', description: 'Smoke Break Rm. High heat', details: 'Smoke Detected in Break Room High Heat' },
            { code: '4313', title: 'Tungsten Building', description: 'Smoke AHU supply', details: 'Smoke Detected in AHU Supply' },
            { code: '4321', title: 'Tungsten Building', description: 'Smoke MCC', details: 'Smoke Detected in MCC' },
            { code: '4322', title: 'Tungsten Building', description: 'Smoke Sorgato units N/S', details: 'Smoke Detected in Sorgato Units North/South' },
            { code: '4323', title: 'Tungsten Building', description: 'Smoke MCC Rm.', details: 'Smoke Detected in MCC Room' },
            { code: '4324', title: 'Tungsten Building', description: 'Smoke AHU office', details: 'Smoke Detected in AHU Office' },
            { code: '4411', title: 'Tungsten Building', description: 'Flow Riser 44', details: 'Flow Detected at Riser 44' },
            { code: '4412', title: 'Tungsten Building', description: 'Flow Riser 45', details: 'Flow Detected at Riser 45' },
            { code: '4413', title: 'Tungsten Building', description: 'Flow Log saw', details: 'Flow Detected at Log Saw Area' },
            { code: '4414', title: 'Tungsten Building', description: 'Flow Log accumulator', details: 'Flow Detected at Log Accumulator' },
            { code: '4421', title: 'Tungsten Building', description: 'Flow Winder', details: 'Flow Detected at Winder Area' },
            { code: '4422', title: 'Tungsten Building', description: 'GreCon', details: 'GreCon System' },
            { code: '4423', title: 'Tungsten Building', description: 'Log conveyor', details: 'Flow Detected at Log Conveyor' },
            { code: '4424', title: 'Tungsten Building', description: 'Baler S. houses', details: 'Flow Detected at Baler South Houses' },
            { code: '4425', title: 'Tungsten Building', description: 'Eyewash Mezz.', details: 'Eyewash Station Mezzanine' },
            { code: '3412', title: 'Aspen', description: 'Flow Hard Roll Storage', details: 'Flow Detected at Hard Roll Storage' },
            { code: '3413', title: 'Aspen', description: 'Flow R-47 Conv.', details: 'Flow Detected at R-47 Conveyor' },
            { code: '3414', title: 'Aspen', description: 'Flow R-48 FPW', details: 'Flow Detected at R-48 FPW' },
            { code: '3415', title: 'Aspen', description: 'Flow R-49 FPW', details: 'Flow Detected at R-49 FPW' },
            { code: '3421', title: 'Aspen', description: 'Flow R-50 Conv.', details: 'Flow Detected at R-50 Conveyor' },
            { code: '3422', title: 'Aspen', description: 'Flow R-51 Conv.', details: 'Flow Detected at R-51 Conveyor' },
            { code: '3423', title: 'Aspen', description: 'Flow R-52 Conv.', details: 'Flow Detected at R-52 Conveyor' },
            { code: '3424', title: 'Aspen', description: 'Flow R-53 Conv.', details: 'Flow Detected at R-53 Conveyor' },
            { code: '3432', title: 'Aspen', description: 'Flow Butt Roll Saw', details: 'Flow Detected at Butt Roll Saw' },
            { code: '3433', title: 'Aspen', description: 'Flow CO2 Butt Roll Saw', details: 'Flow Detected at CO2 Butt Roll Saw' },
            { code: '3434', title: 'Aspen', description: 'Flow OLP/Multifolder/Facial Saw', details: 'Flow Detected at OLP/Multifolder/Facial Saw' },
            { code: '3435', title: 'Aspen', description: 'GreCon', details: 'GreCon System' },
            { code: '3242', title: 'Aspen', description: 'FPW Pulls', details: 'FPW Pulls in Aspen Area' },
            { code: '3222', title: 'Aspen', description: 'Conv. Pulls', details: 'Conveyor Pulls in Aspen Area' },
            { code: '3223', title: 'Aspen', description: 'MCC Pulls', details: 'MCC Pulls in Aspen Area' },
            { code: '3343', title: 'Aspen', description: 'Wet Scrubber Smoke', details: 'Smoke Detected at Wet Scrubber' },
            { code: '3225', title: 'Aspen', description: 'Equipment Mezz. Pulls', details: 'Equipment Mezzanine Pulls' },
            { code: '3231', title: 'Aspen', description: 'Bulk Tank/Wet Scrub. Pulls', details: 'Bulk Tank and Wet Scrubber Pulls' },
            { code: '3232', title: 'Aspen', description: 'Breakroom Pull', details: 'Pull Station at Breakroom' },
            { code: '3233', title: 'Aspen', description: 'Office Area Pull', details: 'Pull Station at Office Area' },
            { code: '3234', title: 'Aspen', description: 'Maintenance Pull', details: 'Pull Station at Maintenance Area' },
            { code: '3322', title: 'Aspen', description: 'Fire Door #30 Aspen FPW', details: 'Fire Door #30 Aspen FPW' },
            { code: '3323', title: 'Aspen', description: 'Fire Door #28 Aspen', details: 'Fire Door #28 Aspen' },
            { code: '3324', title: 'Aspen', description: 'Fire Door #29 Aspen', details: 'Fire Door #29 Aspen' },
            { code: '3325', title: 'Aspen', description: 'Maintenance Smoke', details: 'Smoke Detected at Maintenance Area' },
            { code: '3332', title: 'Aspen', description: 'Break Room Smoke', details: 'Smoke Detected at Break Room' },
            { code: '3333', title: 'Aspen', description: 'HVAC Smokes', details: 'Smoke Detected at HVAC' },
            { code: '3334', title: 'Aspen', description: 'Conference Smoke', details: 'Smoke Detected at Conference Area' },
            { code: '3335', title: 'Aspen', description: 'Office Area Smokes', details: 'Smoke Detected at Office Area' },
            { code: '3341', title: 'Aspen', description: 'MCC Smoke', details: 'Smoke Detected at MCC' },
            { code: '3342', title: 'Aspen', description: 'Mezz. Smoke', details: 'Smoke Detected at Mezzanine' },
            { code: '3112', title: 'Aspen', description: 'Bulk Tank Eyewash', details: 'Eyewash Station at Bulk Tank' },
            { code: '3113', title: 'Aspen', description: 'Chem. Unload Eyewash', details: 'Eyewash Station at Chemical Unloading' },
            { code: '3114', title: 'Aspen', description: 'OLP Eyewash', details: 'Eyewash Station at OLP' },
            { code: '3121', title: 'Aspen', description: 'Mezz. Eyewash', details: 'Eyewash Station at Mezzanine' },
            { code: '3425', title: 'Aspen', description: 'CO2 Facial Saw', details: 'CO2 Facial Saw Area' },
            { code: '3244', title: 'Aspen', description: 'Facial Saw Pulls', details: 'Facial Saw Pulls' },
            { code: '3241', title: 'Aspen', description: 'Butt Roll Saw Pull', details: 'Butt Roll Saw Pull' }
          ];
      await AsyncStorage.setItem(CODES_KEY, JSON.stringify(sampleData));
      console.log('Database initialized with sample data');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

export const getCodeDetails = async (code) => {
    try {
      console.log('Fetching code details for:', code);
      const data = await AsyncStorage.getItem(CODES_KEY);
      if (data) {
        const codes = JSON.parse(data);
        const result = codes.find(item => item.code === code);
        console.log('Code details found:', result);
        return result || null;
      }
      console.log('No data found in database.');
      return null;
    } catch (error) {
      console.error('Error fetching code:', error);
      throw error;
    }
  };
  

export const getAllCodes = async () => {
  try {
    const data = await AsyncStorage.getItem(CODES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting all codes:', error);
    return [];
  }
};

