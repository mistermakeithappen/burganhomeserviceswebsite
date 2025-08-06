export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'select' | 'radio' | 'checkbox' | 'textarea' | 'number' | 'date';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  dependsOn?: { 
    field: string; 
    value: string | string[]; 
    condition?: 'equals' | 'includes' | 'notEquals' 
  };
  validation?: {
    pattern?: string;
    message?: string;
  };
}

export interface ServiceFormConfig {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
}

// Base contact fields used across all forms
export const baseContactFields: FormField[] = [
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    placeholder: 'John',
    required: true
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    placeholder: 'Doe',
    required: true
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    placeholder: 'john@example.com',
    required: true
  },
  {
    name: 'phone',
    label: 'Phone Number',
    type: 'tel',
    placeholder: '(509) 555-0123',
    required: true
  },
  {
    name: 'address',
    label: 'Service Address',
    type: 'text',
    placeholder: '123 Main St',
    required: true
  },
  {
    name: 'city',
    label: 'City',
    type: 'text',
    placeholder: 'Spokane',
    required: true
  },
  {
    name: 'zipCode',
    label: 'ZIP Code',
    type: 'text',
    placeholder: '99201',
    required: true,
    validation: {
      pattern: '^[0-9]{5}$',
      message: 'Please enter a valid 5-digit ZIP code'
    }
  }
];

export const serviceFormConfigs: Record<string, ServiceFormConfig> = {
  handyman: {
    id: 'handyman',
    title: 'Handyman Services Quote',
    description: 'Professional repairs and maintenance for your home',
    fields: [
      {
        name: 'handymanServices',
        label: 'What services do you need? (Check all that apply)',
        type: 'checkbox',
        required: true,
        options: [
          { value: 'furniture', label: 'Furniture Assembly' },
          { value: 'tv-mount', label: 'TV Mounting' },
          { value: 'shelving', label: 'Shelf Installation' },
          { value: 'pictures', label: 'Picture/Art Hanging' },
          { value: 'door-repair', label: 'Door Repair/Adjustment' },
          { value: 'window-repair', label: 'Window Repair' },
          { value: 'caulking', label: 'Caulking & Sealing' },
          { value: 'weatherstrip', label: 'Weather Stripping' },
          { value: 'tile-repair', label: 'Tile Repair' },
          { value: 'grout', label: 'Grout Repair' },
          { value: 'faucet', label: 'Faucet Repair/Replace' },
          { value: 'toilet', label: 'Toilet Repair' },
          { value: 'garbage-disposal', label: 'Garbage Disposal' },
          { value: 'ceiling-fan', label: 'Ceiling Fan Install' },
          { value: 'light-fixture', label: 'Light Fixture Replace' },
          { value: 'outlet-switch', label: 'Outlet/Switch Repair' },
          { value: 'fence-gate', label: 'Fence/Gate Repair' },
          { value: 'gutter-clean', label: 'Gutter Cleaning' },
          { value: 'pressure-wash', label: 'Pressure Washing' },
          { value: 'other', label: 'Other (describe below)' }
        ]
      },
      {
        name: 'furnitureDetails',
        label: 'What furniture needs assembly?',
        type: 'textarea',
        placeholder: 'List items and brands if known (e.g., IKEA dresser, office desk)',
        dependsOn: { field: 'handymanServices', value: 'furniture', condition: 'includes' }
      },
      {
        name: 'tvMountDetails',
        label: 'TV mounting details',
        type: 'checkbox',
        dependsOn: { field: 'handymanServices', value: 'tv-mount', condition: 'includes' },
        options: [
          { value: 'bracket-provided', label: 'I have the mounting bracket' },
          { value: 'need-bracket', label: 'Need mounting bracket' },
          { value: 'hide-cables', label: 'Hide cables in wall' },
          { value: 'sound-bar', label: 'Mount sound bar too' }
        ]
      },
      {
        name: 'tvSize',
        label: 'TV size',
        type: 'select',
        dependsOn: { field: 'handymanServices', value: 'tv-mount', condition: 'includes' },
        options: [
          { value: 'under-32', label: 'Under 32 inches' },
          { value: '32-50', label: '32-50 inches' },
          { value: '51-65', label: '51-65 inches' },
          { value: '66-75', label: '66-75 inches' },
          { value: 'over-75', label: 'Over 75 inches' }
        ]
      },
      {
        name: 'doorIssues',
        label: 'What door problems are you having?',
        type: 'checkbox',
        dependsOn: { field: 'handymanServices', value: 'door-repair', condition: 'includes' },
        options: [
          { value: 'sticking', label: 'Door sticks/drags' },
          { value: 'not-closing', label: 'Won\'t close properly' },
          { value: 'not-latching', label: 'Won\'t latch' },
          { value: 'squeaking', label: 'Squeaks' },
          { value: 'handle-loose', label: 'Loose handle/knob' },
          { value: 'deadbolt', label: 'Deadbolt issues' }
        ]
      },
      {
        name: 'numberOfTasks',
        label: 'Approximately how many tasks total?',
        type: 'select',
        options: [
          { value: '1-2', label: '1-2 tasks' },
          { value: '3-5', label: '3-5 tasks' },
          { value: '6-10', label: '6-10 tasks' },
          { value: 'full-day', label: 'Full day of work' },
          { value: 'multiple-days', label: 'Multiple days' }
        ]
      },
      {
        name: 'timePreference',
        label: 'When would you like this done?',
        type: 'select',
        options: [
          { value: 'asap', label: 'As soon as possible' },
          { value: 'this-week', label: 'This week' },
          { value: 'next-week', label: 'Next week' },
          { value: 'flexible', label: 'I\'m flexible' }
        ]
      },
      {
        name: 'propertyType',
        label: 'Property type',
        type: 'radio',
        options: [
          { value: 'home', label: 'Single Family Home' },
          { value: 'condo', label: 'Condo/Townhouse' },
          { value: 'apartment', label: 'Apartment' },
          { value: 'commercial', label: 'Commercial Property' }
        ]
      },
      ...baseContactFields,
      {
        name: 'otherDetails',
        label: 'Other tasks or special instructions',
        type: 'textarea',
        placeholder: 'Please describe any other work needed or special requirements...',
        dependsOn: { field: 'handymanServices', value: 'other', condition: 'includes' },
        required: true
      },
      {
        name: 'additionalInfo',
        label: 'Additional Information',
        type: 'textarea',
        placeholder: 'Any other details we should know?'
      }
    ]
  },

  roofing: {
    id: 'roofing',
    title: 'Roofing Services Quote',
    description: 'Get a free estimate for your roofing project',
    fields: [
      {
        name: 'roofingService',
        label: 'What roofing service do you need?',
        type: 'select',
        required: true,
        options: [
          { value: 'repair', label: 'Roof Repair' },
          { value: 'replacement', label: 'Roof Replacement' },
          { value: 'rejuvenation', label: 'Roof Rejuvenation' },
          { value: 'inspection', label: 'Roof Inspection' },
          { value: 'emergency', label: 'Emergency Repair' }
        ]
      },
      {
        name: 'problemAreas',
        label: 'What problems are you experiencing?',
        type: 'checkbox',
        dependsOn: { field: 'roofingService', value: ['repair', 'emergency'], condition: 'includes' },
        options: [
          { value: 'leak', label: 'Active leak' },
          { value: 'missing-shingles', label: 'Missing shingles' },
          { value: 'damaged-shingles', label: 'Damaged/curling shingles' },
          { value: 'ice-dam', label: 'Ice dam damage' },
          { value: 'wind-damage', label: 'Wind damage' },
          { value: 'tree-damage', label: 'Tree/branch damage' },
          { value: 'flashing', label: 'Flashing issues' },
          { value: 'ventilation', label: 'Poor ventilation' }
        ]
      },
      {
        name: 'leakLocation',
        label: 'Where is the leak?',
        type: 'checkbox',
        dependsOn: { field: 'problemAreas', value: 'leak', condition: 'includes' },
        options: [
          { value: 'bedroom', label: 'Bedroom' },
          { value: 'bathroom', label: 'Bathroom' },
          { value: 'kitchen', label: 'Kitchen' },
          { value: 'living-room', label: 'Living Room' },
          { value: 'attic', label: 'Attic' },
          { value: 'ceiling', label: 'Ceiling (multiple rooms)' },
          { value: 'around-chimney', label: 'Around chimney' },
          { value: 'around-skylight', label: 'Around skylight' }
        ]
      },
      {
        name: 'urgency',
        label: 'How urgent is this?',
        type: 'select',
        required: true,
        dependsOn: { field: 'roofingService', value: ['repair', 'emergency'], condition: 'includes' },
        options: [
          { value: 'emergency', label: 'Emergency - Active damage' },
          { value: 'urgent', label: 'Urgent - Within 48 hours' },
          { value: 'soon', label: 'Soon - Within a week' },
          { value: 'planned', label: 'Planned - Within a month' }
        ]
      },
      {
        name: 'roofAge',
        label: 'How old is your roof?',
        type: 'select',
        dependsOn: { field: 'roofingService', value: ['replacement', 'rejuvenation'], condition: 'includes' },
        options: [
          { value: '0-5', label: '0-5 years' },
          { value: '5-10', label: '5-10 years' },
          { value: '10-15', label: '10-15 years' },
          { value: '15-20', label: '15-20 years' },
          { value: '20+', label: 'Over 20 years' },
          { value: 'unknown', label: 'Not sure' }
        ]
      },
      {
        name: 'replacementReason',
        label: 'Why are you considering replacement?',
        type: 'checkbox',
        dependsOn: { field: 'roofingService', value: 'replacement' },
        options: [
          { value: 'age', label: 'Age of roof' },
          { value: 'multiple-repairs', label: 'Multiple repairs needed' },
          { value: 'selling', label: 'Selling home' },
          { value: 'insurance', label: 'Insurance requirement' },
          { value: 'energy', label: 'Energy efficiency' },
          { value: 'appearance', label: 'Improve appearance' }
        ]
      },
      {
        name: 'roofType',
        label: 'Current roof material',
        type: 'select',
        options: [
          { value: 'asphalt', label: 'Asphalt Shingles' },
          { value: 'metal', label: 'Metal' },
          { value: 'tile', label: 'Tile' },
          { value: 'wood', label: 'Wood Shakes' },
          { value: 'flat', label: 'Flat/Membrane' },
          { value: 'other', label: 'Other/Not Sure' }
        ]
      },
      {
        name: 'homeStories',
        label: 'How many stories is your home?',
        type: 'select',
        options: [
          { value: '1', label: 'Single Story' },
          { value: '2', label: 'Two Story' },
          { value: '3+', label: 'Three or More' }
        ]
      },
      {
        name: 'insuranceClaim',
        label: 'Is this for an insurance claim?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
          { value: 'maybe', label: 'Possibly' }
        ]
      },
      ...baseContactFields,
      {
        name: 'additionalInfo',
        label: 'Additional Information',
        type: 'textarea',
        placeholder: 'Please describe any specific issues or requirements...'
      }
    ]
  },

  kitchen: {
    id: 'kitchen',
    title: 'Kitchen & Bath Remodeling Quote',
    description: 'Transform your kitchen or bathroom with our expert remodeling services',
    fields: [
      {
        name: 'remodelType',
        label: 'What are you looking to remodel?',
        type: 'radio',
        required: true,
        options: [
          { value: 'kitchen', label: 'Kitchen' },
          { value: 'bathroom', label: 'Bathroom' },
          { value: 'both', label: 'Both Kitchen and Bathroom' }
        ]
      },
      {
        name: 'kitchenScope',
        label: 'What kitchen updates do you need?',
        type: 'checkbox',
        required: true,
        dependsOn: { field: 'remodelType', value: ['kitchen', 'both'], condition: 'includes' },
        options: [
          { value: 'layout', label: 'Change Layout' },
          { value: 'cabinets', label: 'New Cabinets' },
          { value: 'countertops', label: 'New Countertops' },
          { value: 'backsplash', label: 'Backsplash' },
          { value: 'appliances', label: 'New Appliances' },
          { value: 'flooring', label: 'New Flooring' },
          { value: 'island', label: 'Add/Modify Island' },
          { value: 'lighting', label: 'Lighting Upgrade' },
          { value: 'plumbing', label: 'Move Plumbing' },
          { value: 'electrical', label: 'Electrical Updates' }
        ]
      },
      {
        name: 'bathroomType',
        label: 'Which bathroom?',
        type: 'select',
        required: true,
        dependsOn: { field: 'remodelType', value: ['bathroom', 'both'], condition: 'includes' },
        options: [
          { value: 'master', label: 'Master Bathroom' },
          { value: 'guest', label: 'Guest Bathroom' },
          { value: 'half', label: 'Half Bath/Powder Room' },
          { value: 'kids', label: 'Kids Bathroom' },
          { value: 'basement', label: 'Basement Bathroom' },
          { value: 'multiple', label: 'Multiple Bathrooms' }
        ]
      },
      {
        name: 'bathroomScope',
        label: 'What bathroom work do you need?',
        type: 'checkbox',
        required: true,
        dependsOn: { field: 'remodelType', value: ['bathroom', 'both'], condition: 'includes' },
        options: [
          { value: 'shower', label: 'Shower Replacement/Install' },
          { value: 'tub', label: 'Bathtub Replacement/Install' },
          { value: 'vanity', label: 'Vanity & Sink' },
          { value: 'toilet', label: 'Toilet Replacement' },
          { value: 'flooring', label: 'Flooring' },
          { value: 'tile', label: 'Tile Work' },
          { value: 'lighting', label: 'Lighting & Fixtures' },
          { value: 'storage', label: 'Storage Solutions' },
          { value: 'full', label: 'Complete Remodel' }
        ]
      },
      {
        name: 'layoutChanges',
        label: 'What layout changes are you considering?',
        type: 'checkbox',
        dependsOn: { field: 'kitchenScope', value: 'layout', condition: 'includes' },
        options: [
          { value: 'open-concept', label: 'Open up to living/dining area' },
          { value: 'move-appliances', label: 'Relocate appliances' },
          { value: 'expand', label: 'Expand kitchen size' },
          { value: 'add-windows', label: 'Add/enlarge windows' },
          { value: 'remove-wall', label: 'Remove wall(s)' }
        ]
      },
      {
        name: 'cabinetStyle',
        label: 'Cabinet preference',
        type: 'select',
        dependsOn: { field: 'kitchenScope', value: 'cabinets', condition: 'includes' },
        options: [
          { value: 'stock', label: 'Stock Cabinets (Budget-friendly)' },
          { value: 'semi-custom', label: 'Semi-Custom Cabinets' },
          { value: 'custom', label: 'Full Custom Cabinets' },
          { value: 'reface', label: 'Reface Existing Cabinets' },
          { value: 'paint', label: 'Paint Existing Cabinets' }
        ]
      },
      {
        name: 'countertopMaterial',
        label: 'Countertop material preference',
        type: 'select',
        dependsOn: { field: 'kitchenScope', value: 'countertops', condition: 'includes' },
        options: [
          { value: 'granite', label: 'Granite' },
          { value: 'quartz', label: 'Quartz' },
          { value: 'quartzite', label: 'Quartzite' },
          { value: 'marble', label: 'Marble' },
          { value: 'butcherblock', label: 'Butcher Block' },
          { value: 'concrete', label: 'Concrete' },
          { value: 'laminate', label: 'Laminate' },
          { value: 'solid-surface', label: 'Solid Surface (Corian)' },
          { value: 'undecided', label: 'Need Recommendations' }
        ]
      },
      {
        name: 'applianceTypes',
        label: 'Which appliances need replacing?',
        type: 'checkbox',
        dependsOn: { field: 'kitchenScope', value: 'appliances', condition: 'includes' },
        options: [
          { value: 'refrigerator', label: 'Refrigerator' },
          { value: 'range', label: 'Range/Cooktop' },
          { value: 'oven', label: 'Wall Oven' },
          { value: 'microwave', label: 'Microwave' },
          { value: 'dishwasher', label: 'Dishwasher' },
          { value: 'hood', label: 'Range Hood' },
          { value: 'disposal', label: 'Garbage Disposal' }
        ]
      },
      {
        name: 'applianceGrade',
        label: 'Appliance quality level',
        type: 'select',
        dependsOn: { field: 'kitchenScope', value: 'appliances', condition: 'includes' },
        options: [
          { value: 'builder', label: 'Builder Grade (Budget)' },
          { value: 'standard', label: 'Standard (Mid-range)' },
          { value: 'premium', label: 'Premium (High-end)' },
          { value: 'luxury', label: 'Luxury (Professional)' }
        ]
      },
      {
        name: 'islandDetails',
        label: 'Island preferences',
        type: 'checkbox',
        dependsOn: { field: 'kitchenScope', value: 'island', condition: 'includes' },
        options: [
          { value: 'seating', label: 'Include seating' },
          { value: 'sink', label: 'Add sink' },
          { value: 'cooktop', label: 'Add cooktop' },
          { value: 'storage', label: 'Maximum storage' },
          { value: 'electrical', label: 'Add outlets' }
        ]
      },
      {
        name: 'showerType',
        label: 'Shower preference',
        type: 'select',
        dependsOn: { field: 'bathroomScope', value: 'shower', condition: 'includes' },
        options: [
          { value: 'prefab', label: 'Prefab/Acrylic Unit' },
          { value: 'tile', label: 'Custom Tile Shower' },
          { value: 'walk-in', label: 'Walk-in Shower' },
          { value: 'steam', label: 'Steam Shower' },
          { value: 'tub-shower', label: 'Tub/Shower Combo' }
        ]
      },
      {
        name: 'tubType',
        label: 'Bathtub preference',
        type: 'select',
        dependsOn: { field: 'bathroomScope', value: 'tub', condition: 'includes' },
        options: [
          { value: 'standard', label: 'Standard Tub' },
          { value: 'soaking', label: 'Soaking Tub' },
          { value: 'jetted', label: 'Jetted/Whirlpool' },
          { value: 'freestanding', label: 'Freestanding' },
          { value: 'walk-in', label: 'Walk-in Tub' }
        ]
      },
      {
        name: 'vanityStyle',
        label: 'Vanity preference',
        type: 'select',
        dependsOn: { field: 'bathroomScope', value: 'vanity', condition: 'includes' },
        options: [
          { value: 'single', label: 'Single Sink' },
          { value: 'double', label: 'Double Sink' },
          { value: 'floating', label: 'Floating Vanity' },
          { value: 'pedestal', label: 'Pedestal Sink' },
          { value: 'custom', label: 'Custom Vanity' }
        ]
      },
      {
        name: 'kitchenSize',
        label: 'Current kitchen size',
        type: 'select',
        required: true,
        dependsOn: { field: 'remodelType', value: ['kitchen', 'both'], condition: 'includes' },
        options: [
          { value: 'galley', label: 'Galley (Narrow)' },
          { value: 'small', label: 'Small (Less than 100 sq ft)' },
          { value: 'medium', label: 'Medium (100-200 sq ft)' },
          { value: 'large', label: 'Large (200-300 sq ft)' },
          { value: 'xlarge', label: 'Extra Large (300+ sq ft)' }
        ]
      },
      {
        name: 'bathroomSize',
        label: 'Bathroom size',
        type: 'select',
        required: true,
        dependsOn: { field: 'remodelType', value: ['bathroom', 'both'], condition: 'includes' },
        options: [
          { value: 'small', label: 'Small (Under 40 sq ft)' },
          { value: 'medium', label: 'Medium (40-100 sq ft)' },
          { value: 'large', label: 'Large (100-150 sq ft)' },
          { value: 'xlarge', label: 'Extra Large (150+ sq ft)' }
        ]
      },
      {
        name: 'currentCondition',
        label: 'Current condition',
        type: 'select',
        options: [
          { value: 'dated', label: 'Dated but functional' },
          { value: 'poor', label: 'Poor - Multiple issues' },
          { value: 'partial', label: 'Partially updated' },
          { value: 'builder', label: 'Original builder grade' },
          { value: 'damaged', label: 'Has damage needing repair' }
        ]
      },
      {
        name: 'budget',
        label: 'Estimated Budget',
        type: 'select',
        options: [
          { value: 'under10k', label: 'Under $10,000' },
          { value: '10-25k', label: '$10,000 - $25,000' },
          { value: '25-50k', label: '$25,000 - $50,000' },
          { value: '50-75k', label: '$50,000 - $75,000' },
          { value: 'over75k', label: 'Over $75,000' }
        ]
      },
      {
        name: 'timeline',
        label: 'When do you want to start?',
        type: 'select',
        options: [
          { value: 'asap', label: 'As soon as possible' },
          { value: '1month', label: 'Within 1 month' },
          { value: '3months', label: 'Within 3 months' },
          { value: '6months', label: 'Within 6 months' },
          { value: 'planning', label: 'Just planning' }
        ]
      },
      ...baseContactFields,
      {
        name: 'designHelp',
        label: 'Do you need design assistance?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes, I need help with design' },
          { value: 'no', label: 'No, I have my own design' },
          { value: 'partial', label: 'Some guidance would be helpful' }
        ]
      },
      {
        name: 'additionalInfo',
        label: 'Tell us about your vision',
        type: 'textarea',
        placeholder: 'Describe your dream kitchen or bathroom...'
      }
    ]
  },

  bathroom: {
    id: 'bathroom',
    title: 'Bathroom Remodeling Quote',
    description: 'Create your perfect bathroom sanctuary',
    fields: [
      {
        name: 'bathroomType',
        label: 'Which bathroom?',
        type: 'select',
        required: true,
        options: [
          { value: 'master', label: 'Master Bathroom' },
          { value: 'guest', label: 'Guest Bathroom' },
          { value: 'half', label: 'Half Bath/Powder Room' },
          { value: 'kids', label: 'Kids Bathroom' },
          { value: 'basement', label: 'Basement Bathroom' }
        ]
      },
      {
        name: 'projectScope',
        label: 'What work do you need?',
        type: 'checkbox',
        required: true,
        options: [
          { value: 'shower', label: 'Shower Replacement/Install' },
          { value: 'tub', label: 'Bathtub Replacement/Install' },
          { value: 'vanity', label: 'Vanity & Sink' },
          { value: 'toilet', label: 'Toilet Replacement' },
          { value: 'flooring', label: 'Flooring' },
          { value: 'tile', label: 'Tile Work' },
          { value: 'full', label: 'Complete Remodel' }
        ]
      },
      {
        name: 'showerType',
        label: 'Shower Preference',
        type: 'select',
        dependsOn: { field: 'projectScope', value: 'shower' },
        options: [
          { value: 'walkin', label: 'Walk-in Shower' },
          { value: 'tubshower', label: 'Tub/Shower Combo' },
          { value: 'custom', label: 'Custom Tile Shower' },
          { value: 'prefab', label: 'Prefab Shower Unit' }
        ]
      },
      {
        name: 'accessibility',
        label: 'Any accessibility needs?',
        type: 'checkbox',
        options: [
          { value: 'grabrails', label: 'Grab Rails' },
          { value: 'walkintub', label: 'Walk-in Tub' },
          { value: 'rollshower', label: 'Roll-in Shower' },
          { value: 'comfortheight', label: 'Comfort Height Toilet' }
        ]
      },
      ...baseContactFields,
      {
        name: 'additionalInfo',
        label: 'Additional Details',
        type: 'textarea',
        placeholder: 'Any specific requirements or style preferences?'
      }
    ]
  },

  painting: {
    id: 'painting',
    title: 'Painting Services Quote',
    description: 'Professional interior and exterior painting',
    fields: [
      {
        name: 'paintingType',
        label: 'Interior or Exterior?',
        type: 'select',
        required: true,
        options: [
          { value: 'interior', label: 'Interior Painting' },
          { value: 'exterior', label: 'Exterior Painting' },
          { value: 'both', label: 'Both Interior & Exterior' }
        ]
      },
      {
        name: 'interiorRooms',
        label: 'Which rooms need painting?',
        type: 'checkbox',
        dependsOn: { field: 'paintingType', value: ['interior', 'both'], condition: 'includes' },
        options: [
          { value: 'livingroom', label: 'Living Room' },
          { value: 'kitchen', label: 'Kitchen' },
          { value: 'bedrooms', label: 'Bedrooms' },
          { value: 'bathrooms', label: 'Bathrooms' },
          { value: 'hallways', label: 'Hallways' },
          { value: 'basement', label: 'Basement' },
          { value: 'wholehouse', label: 'Whole House' }
        ]
      },
      {
        name: 'numberOfRooms',
        label: 'Number of rooms',
        type: 'number',
        placeholder: 'How many rooms total?',
        dependsOn: { field: 'paintingType', value: ['interior', 'both'], condition: 'includes' }
      },
      {
        name: 'exteriorScope',
        label: 'What exterior areas need painting?',
        type: 'checkbox',
        dependsOn: { field: 'paintingType', value: ['exterior', 'both'], condition: 'includes' },
        options: [
          { value: 'siding', label: 'Siding' },
          { value: 'trim', label: 'Trim & Fascia' },
          { value: 'doors', label: 'Doors' },
          { value: 'garage', label: 'Garage' },
          { value: 'deck', label: 'Deck/Fence' },
          { value: 'shutters', label: 'Shutters' }
        ]
      },
      {
        name: 'currentCondition',
        label: 'Current paint condition',
        type: 'select',
        options: [
          { value: 'good', label: 'Good - Just want new color' },
          { value: 'fair', label: 'Fair - Some wear and minor damage' },
          { value: 'poor', label: 'Poor - Peeling, cracking, or damaged' }
        ]
      },
      {
        name: 'colorDecided',
        label: 'Have you chosen colors?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes, I have colors picked' },
          { value: 'no', label: 'No, I need color consultation' },
          { value: 'some', label: 'I have some ideas' }
        ]
      },
      ...baseContactFields,
      {
        name: 'additionalInfo',
        label: 'Additional Information',
        type: 'textarea',
        placeholder: 'Any specific requirements or timeline?'
      }
    ]
  },

  plumbing: {
    id: 'plumbing',
    title: 'Plumbing Services Quote',
    description: 'Expert plumbing repairs and installations',
    fields: [
      {
        name: 'plumbingNeed',
        label: 'What do you need help with?',
        type: 'select',
        required: true,
        options: [
          { value: 'emergency', label: 'Emergency Repair (Leak/Flood)' },
          { value: 'repair', label: 'General Repair' },
          { value: 'waterheater', label: 'Water Heater Service' },
          { value: 'drain', label: 'Drain Cleaning' },
          { value: 'fixture', label: 'Fixture Installation' },
          { value: 'repipe', label: 'Re-piping' },
          { value: 'sewer', label: 'Sewer Line Service' }
        ]
      },
      {
        name: 'urgency',
        label: 'How urgent is this?',
        type: 'select',
        required: true,
        options: [
          { value: 'emergency', label: 'Emergency - Need help NOW' },
          { value: 'today', label: 'Today if possible' },
          { value: 'week', label: 'This week' },
          { value: 'month', label: 'This month' },
          { value: 'planning', label: 'Just planning ahead' }
        ]
      },
      {
        name: 'problemLocation',
        label: 'Where is the issue?',
        type: 'checkbox',
        options: [
          { value: 'kitchen', label: 'Kitchen' },
          { value: 'bathroom', label: 'Bathroom' },
          { value: 'basement', label: 'Basement' },
          { value: 'laundry', label: 'Laundry Room' },
          { value: 'outdoor', label: 'Outdoor/Hose Bib' },
          { value: 'multiple', label: 'Multiple Locations' }
        ]
      },
      {
        name: 'waterHeaterType',
        label: 'Water heater type',
        type: 'select',
        dependsOn: { field: 'plumbingNeed', value: 'waterheater' },
        options: [
          { value: 'tank', label: 'Traditional Tank' },
          { value: 'tankless', label: 'Tankless' },
          { value: 'unknown', label: 'Not Sure' }
        ]
      },
      ...baseContactFields,
      {
        name: 'problemDescription',
        label: 'Describe the issue',
        type: 'textarea',
        placeholder: 'Please describe what\'s happening...',
        required: true
      }
    ]
  },

  flooring: {
    id: 'flooring',
    title: 'Flooring Installation Quote',
    description: 'Beautiful new floors for your home',
    fields: [
      {
        name: 'flooringType',
        label: 'Type of flooring desired',
        type: 'select',
        required: true,
        options: [
          { value: 'hardwood', label: 'Hardwood' },
          { value: 'laminate', label: 'Laminate' },
          { value: 'vinyl', label: 'Luxury Vinyl (LVP/LVT)' },
          { value: 'tile', label: 'Tile' },
          { value: 'carpet', label: 'Carpet' },
          { value: 'undecided', label: 'Need Recommendations' }
        ]
      },
      {
        name: 'rooms',
        label: 'Which rooms?',
        type: 'checkbox',
        required: true,
        options: [
          { value: 'living', label: 'Living Room' },
          { value: 'bedrooms', label: 'Bedrooms' },
          { value: 'kitchen', label: 'Kitchen' },
          { value: 'bathrooms', label: 'Bathrooms' },
          { value: 'hallways', label: 'Hallways' },
          { value: 'basement', label: 'Basement' },
          { value: 'wholehouse', label: 'Whole House' }
        ]
      },
      {
        name: 'squareFootage',
        label: 'Approximate square footage',
        type: 'select',
        options: [
          { value: 'under500', label: 'Under 500 sq ft' },
          { value: '500-1000', label: '500-1000 sq ft' },
          { value: '1000-1500', label: '1000-1500 sq ft' },
          { value: '1500-2000', label: '1500-2000 sq ft' },
          { value: 'over2000', label: 'Over 2000 sq ft' },
          { value: 'unknown', label: 'Not sure' }
        ]
      },
      {
        name: 'currentFlooring',
        label: 'What\'s currently there?',
        type: 'select',
        options: [
          { value: 'carpet', label: 'Carpet' },
          { value: 'hardwood', label: 'Hardwood' },
          { value: 'tile', label: 'Tile' },
          { value: 'vinyl', label: 'Vinyl/Linoleum' },
          { value: 'concrete', label: 'Concrete' },
          { value: 'mixed', label: 'Mixed/Various' }
        ]
      },
      {
        name: 'removalNeeded',
        label: 'Remove existing flooring?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes, remove old flooring' },
          { value: 'no', label: 'No, install over existing' },
          { value: 'partial', label: 'Some areas only' }
        ]
      },
      ...baseContactFields,
      {
        name: 'additionalInfo',
        label: 'Additional Information',
        type: 'textarea',
        placeholder: 'Any special requirements or preferences?'
      }
    ]
  },

  deck: {
    id: 'deck',
    title: 'Deck & Outdoor Quote',
    description: 'Create your perfect outdoor living space',
    fields: [
      {
        name: 'projectType',
        label: 'What do you need?',
        type: 'select',
        required: true,
        options: [
          { value: 'newdeck', label: 'New Deck Construction' },
          { value: 'repair', label: 'Deck Repair' },
          { value: 'replace', label: 'Deck Replacement' },
          { value: 'pergola', label: 'Pergola/Cover' },
          { value: 'fence', label: 'Fence Installation/Repair' }
        ]
      },
      {
        name: 'deckSize',
        label: 'Approximate size',
        type: 'select',
        dependsOn: { field: 'projectType', value: 'newdeck' },
        options: [
          { value: 'small', label: 'Small (Under 200 sq ft)' },
          { value: 'medium', label: 'Medium (200-400 sq ft)' },
          { value: 'large', label: 'Large (400-600 sq ft)' },
          { value: 'xlarge', label: 'Extra Large (600+ sq ft)' }
        ]
      },
      {
        name: 'material',
        label: 'Preferred material',
        type: 'select',
        options: [
          { value: 'pressure', label: 'Pressure Treated Wood' },
          { value: 'cedar', label: 'Cedar' },
          { value: 'composite', label: 'Composite' },
          { value: 'pvc', label: 'PVC' },
          { value: 'undecided', label: 'Need Recommendations' }
        ]
      },
      {
        name: 'features',
        label: 'Desired features',
        type: 'checkbox',
        options: [
          { value: 'stairs', label: 'Stairs' },
          { value: 'railing', label: 'Railing' },
          { value: 'lighting', label: 'Built-in Lighting' },
          { value: 'benches', label: 'Built-in Seating' },
          { value: 'pergola', label: 'Pergola/Shade Structure' },
          { value: 'multiLevel', label: 'Multi-level Design' }
        ]
      },
      ...baseContactFields,
      {
        name: 'additionalInfo',
        label: 'Project Details',
        type: 'textarea',
        placeholder: 'Describe your vision for the space...'
      }
    ]
  },

  siding: {
    id: 'siding',
    title: 'Siding Installation Quote',
    description: 'Protect and beautify your home\'s exterior',
    fields: [
      {
        name: 'sidingProject',
        label: 'Project type',
        type: 'select',
        required: true,
        options: [
          { value: 'fullhouse', label: 'Full House Siding' },
          { value: 'repair', label: 'Siding Repair' },
          { value: 'partial', label: 'Partial Replacement' },
          { value: 'addon', label: 'Addition/New Construction' }
        ]
      },
      {
        name: 'currentSiding',
        label: 'Current siding type',
        type: 'select',
        options: [
          { value: 'vinyl', label: 'Vinyl' },
          { value: 'wood', label: 'Wood' },
          { value: 'fiber', label: 'Fiber Cement' },
          { value: 'aluminum', label: 'Aluminum' },
          { value: 'brick', label: 'Brick' },
          { value: 'stucco', label: 'Stucco' },
          { value: 'none', label: 'New Construction' }
        ]
      },
      {
        name: 'preferredSiding',
        label: 'Preferred new siding',
        type: 'select',
        options: [
          { value: 'vinyl', label: 'Vinyl' },
          { value: 'fiber', label: 'Fiber Cement (Hardie)' },
          { value: 'wood', label: 'Wood' },
          { value: 'engineered', label: 'Engineered Wood' },
          { value: 'metal', label: 'Metal' },
          { value: 'undecided', label: 'Need Recommendations' }
        ]
      },
      {
        name: 'homeSize',
        label: 'Home square footage',
        type: 'select',
        options: [
          { value: 'under1500', label: 'Under 1,500 sq ft' },
          { value: '1500-2000', label: '1,500-2,000 sq ft' },
          { value: '2000-2500', label: '2,000-2,500 sq ft' },
          { value: '2500-3000', label: '2,500-3,000 sq ft' },
          { value: 'over3000', label: 'Over 3,000 sq ft' }
        ]
      },
      {
        name: 'includeInsulation',
        label: 'Add insulation?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes, add insulation' },
          { value: 'no', label: 'No insulation needed' },
          { value: 'evaluate', label: 'Evaluate and recommend' }
        ]
      },
      ...baseContactFields,
      {
        name: 'additionalInfo',
        label: 'Additional Information',
        type: 'textarea',
        placeholder: 'Any specific concerns or requirements?'
      }
    ]
  },

  windows: {
    id: 'windows',
    title: 'Window & Door Quote',
    description: 'Energy-efficient windows and doors',
    fields: [
      {
        name: 'serviceType',
        label: 'What do you need?',
        type: 'checkbox',
        required: true,
        options: [
          { value: 'windows', label: 'Window Replacement' },
          { value: 'doors', label: 'Door Replacement' },
          { value: 'sliding', label: 'Sliding/Patio Doors' },
          { value: 'repair', label: 'Window/Door Repair' }
        ]
      },
      {
        name: 'numberOfWindows',
        label: 'How many windows?',
        type: 'select',
        dependsOn: { field: 'serviceType', value: 'windows' },
        options: [
          { value: '1-5', label: '1-5 windows' },
          { value: '6-10', label: '6-10 windows' },
          { value: '11-15', label: '11-15 windows' },
          { value: '16-20', label: '16-20 windows' },
          { value: 'over20', label: 'Over 20 windows' }
        ]
      },
      {
        name: 'windowStyle',
        label: 'Window style preference',
        type: 'select',
        dependsOn: { field: 'serviceType', value: 'windows' },
        options: [
          { value: 'doublehung', label: 'Double Hung' },
          { value: 'casement', label: 'Casement' },
          { value: 'sliding', label: 'Sliding' },
          { value: 'bay', label: 'Bay/Bow' },
          { value: 'fixed', label: 'Fixed/Picture' },
          { value: 'mixed', label: 'Various Styles' }
        ]
      },
      {
        name: 'priority',
        label: 'Main priority',
        type: 'select',
        options: [
          { value: 'energy', label: 'Energy Efficiency' },
          { value: 'noise', label: 'Noise Reduction' },
          { value: 'security', label: 'Security' },
          { value: 'aesthetics', label: 'Appearance' },
          { value: 'all', label: 'All of the Above' }
        ]
      },
      ...baseContactFields,
      {
        name: 'additionalInfo',
        label: 'Additional Details',
        type: 'textarea',
        placeholder: 'Any specific requirements or brands preferred?'
      }
    ]
  },

  electrical: {
    id: 'electrical',
    title: 'Electrical Services Quote',
    description: 'Safe and reliable electrical work',
    fields: [
      {
        name: 'electricalNeed',
        label: 'What electrical work do you need?',
        type: 'checkbox',
        required: true,
        options: [
          { value: 'panel', label: 'Panel Upgrade/Replacement' },
          { value: 'outlets', label: 'Outlet Installation/Repair' },
          { value: 'lighting', label: 'Lighting Installation' },
          { value: 'ceiling-fan', label: 'Ceiling Fan Installation' },
          { value: 'wiring', label: 'Rewiring' },
          { value: 'ev-charger', label: 'EV Charger Installation' },
          { value: 'generator', label: 'Generator Installation' },
          { value: 'troubleshoot', label: 'Troubleshooting Issue' }
        ]
      },
      {
        name: 'urgency',
        label: 'How urgent is this?',
        type: 'select',
        required: true,
        options: [
          { value: 'emergency', label: 'Emergency - No power' },
          { value: 'urgent', label: 'Urgent - Safety concern' },
          { value: 'soon', label: 'Soon - Within a week' },
          { value: 'planned', label: 'Planned project' }
        ]
      },
      {
        name: 'panelAge',
        label: 'Age of electrical panel',
        type: 'select',
        dependsOn: { field: 'electricalNeed', value: 'panel' },
        options: [
          { value: 'new', label: 'Less than 10 years' },
          { value: 'moderate', label: '10-25 years' },
          { value: 'old', label: '25-40 years' },
          { value: 'veryold', label: 'Over 40 years' },
          { value: 'unknown', label: 'Not sure' }
        ]
      },
      ...baseContactFields,
      {
        name: 'issueDescription',
        label: 'Describe the work needed',
        type: 'textarea',
        placeholder: 'Please provide details about the electrical work needed...',
        required: true
      }
    ]
  },

  drywall: {
    id: 'drywall',
    title: 'Drywall Services Quote',
    description: 'Professional drywall repair and installation',
    fields: [
      {
        name: 'drywallType',
        label: 'Type of drywall work',
        type: 'select',
        required: true,
        options: [
          { value: 'repair-small', label: 'Small Repair (nail holes, minor damage)' },
          { value: 'repair-large', label: 'Large Repair (holes, water damage)' },
          { value: 'new-install', label: 'New Drywall Installation' },
          { value: 'ceiling', label: 'Ceiling Repair/Texture' },
          { value: 'finish', label: 'Finishing Basement/Room' }
        ]
      },
      {
        name: 'numberOfAreas',
        label: 'How many areas need work?',
        type: 'select',
        options: [
          { value: '1', label: '1 area' },
          { value: '2-3', label: '2-3 areas' },
          { value: '4-5', label: '4-5 areas' },
          { value: 'many', label: 'More than 5' },
          { value: 'wholeroom', label: 'Entire room(s)' }
        ]
      },
      {
        name: 'texture',
        label: 'Texture preference',
        type: 'select',
        options: [
          { value: 'smooth', label: 'Smooth' },
          { value: 'knockdown', label: 'Knockdown' },
          { value: 'orange', label: 'Orange Peel' },
          { value: 'match', label: 'Match Existing' },
          { value: 'none', label: 'No Texture Needed' }
        ]
      },
      {
        name: 'includePainting',
        label: 'Include painting?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes, paint after repair' },
          { value: 'no', label: 'No, drywall only' },
          { value: 'primer', label: 'Prime only' }
        ]
      },
      ...baseContactFields,
      {
        name: 'additionalInfo',
        label: 'Describe the damage/project',
        type: 'textarea',
        placeholder: 'Please describe what needs to be done...',
        required: true
      }
    ]
  }
};