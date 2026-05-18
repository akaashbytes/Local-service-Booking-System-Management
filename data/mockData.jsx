export const SERVICE_CATEGORIES = [
  { id: 'plumbing',   label: 'Plumbing',        icon: '🔧', desc: 'Leaks, pipes, taps & drainage',    startingPrice: 299 },
  { id: 'electrical', label: 'Electrical',       icon: '⚡', desc: 'Wiring, switches & appliances',    startingPrice: 349 },
  { id: 'cleaning',   label: 'Cleaning',         icon: '🧹', desc: 'Deep clean, sofa & carpet',        startingPrice: 599 },
  { id: 'appliance',  label: 'Appliance Repair', icon: '🔨', desc: 'AC, fridge, washing machine',      startingPrice: 449 },
  { id: 'pest',       label: 'Pest Control',     icon: '🐛', desc: 'Termites, cockroach & rodents',    startingPrice: 999 },
  { id: 'painting',   label: 'Painting',         icon: '🎨', desc: 'Interior, exterior & textures',    startingPrice: 1999 },
  { id: 'carpentry',  label: 'Carpentry',        icon: '🪚', desc: 'Furniture, doors & cabinets',      startingPrice: 499 },
  { id: 'hvac',       label: 'HVAC',             icon: '❄️', desc: 'AC service, duct cleaning',        startingPrice: 799 },
];

export const PROVIDERS = [
  { id: 'p1', name: 'Ravi Kumar',   avatar: 'RK', service: 'Plumbing',        experience: '8 yrs', verified: true,  rating: 4.8, reviews: 214, price: 350, location: 'Anna Nagar',     available: true,  tags: ['Leak Fix', 'Pipe Repair', 'Tap Install'] },
  { id: 'p2', name: 'Suresh Babu', avatar: 'SB', service: 'Electrical',       experience: '6 yrs', verified: true,  rating: 4.6, reviews: 189, price: 400, location: 'Velachery',       available: true,  tags: ['Wiring', 'Fan Install', 'Short Circuit'] },
  { id: 'p3', name: 'Meena Devi',  avatar: 'MD', service: 'Cleaning',         experience: '5 yrs', verified: true,  rating: 4.9, reviews: 302, price: 800, location: 'Adyar',           available: false, tags: ['Deep Clean', 'Sofa Wash', 'Carpet'] },
  { id: 'p4', name: 'Karthik Raja',avatar: 'KR', service: 'Appliance Repair', experience: '7 yrs', verified: true,  rating: 4.5, reviews: 145, price: 500, location: 'T Nagar',         available: true,  tags: ['AC Service', 'Fridge', 'Washing Machine'] },
  { id: 'p5', name: 'Anand Pillai',avatar: 'AP', service: 'Pest Control',     experience: '4 yrs', verified: false, rating: 4.7, reviews: 98,  price: 1200, location: 'Nungambakkam',  available: true,  tags: ['Termite', 'Cockroach', 'Rodent'] },
  { id: 'p6', name: 'Divya L.',    avatar: 'DL', service: 'Painting',         experience: '3 yrs', verified: true,  rating: 4.4, reviews: 76,  price: 2500, location: 'Porur',          available: true,  tags: ['Interior', 'Texture', 'Exterior'] },
];

export const BOOKINGS = [
  { id: 'B001', service: 'Plumbing',        status: 'Completed',   date: '2025-02-10', time: '10:00 AM', address: '12, Park St, Anna Nagar', amount: 420,  rating: 5,    providerName: 'Ravi Kumar',   invoiceId: 'INV001' },
  { id: 'B002', service: 'Electrical',       status: 'In Progress', date: '2025-02-22', time: '2:00 PM',  address: '12, Park St, Anna Nagar', amount: 400,  rating: null, providerName: 'Suresh Babu',  invoiceId: 'INV002' },
  { id: 'B003', service: 'Cleaning',         status: 'Requested',   date: '2025-02-25', time: '9:00 AM',  address: '12, Park St, Anna Nagar', amount: 800,  rating: null, providerName: 'Meena Devi',   invoiceId: null },
  { id: 'B004', service: 'Appliance Repair', status: 'Cancelled',   date: '2025-02-05', time: '11:00 AM', address: '12, Park St, Anna Nagar', amount: 0,    rating: null, providerName: 'Karthik Raja', invoiceId: null },
  { id: 'B005', service: 'Carpentry',        status: 'Completed',   date: '2025-01-28', time: '3:00 PM',  address: '12, Park St, Anna Nagar', amount: 750,  rating: 4,    providerName: 'Vijay Selvam', invoiceId: 'INV003' },
];

export const PROVIDER_JOBS = [
  { id: 'B010', customerName: 'Arjun Mehta',   status: 'Requested',   date: '2025-02-24', time: '10:00 AM', address: '12, Park St, Anna Nagar', amount: 420 },
  { id: 'B011', customerName: 'Kavitha Rajan', status: 'Accepted',    date: '2025-02-24', time: '2:00 PM',  address: '5, MG Road, Nungambakkam', amount: 350 },
  { id: 'B012', customerName: 'Siddharth N.',  status: 'In Progress', date: '2025-02-23', time: '11:00 AM', address: '89, GST Road, Tambaram',   amount: 600 },
  { id: 'B013', customerName: 'Anita Sharma',  status: 'Completed',   date: '2025-02-20', time: '9:00 AM',  address: '22, NH45, Perungalathur',  amount: 380 },
];

export const MONTHLY_REVENUE = [
  { month: 'Sep', revenue: 48000, bookings: 142 },
  { month: 'Oct', revenue: 62000, bookings: 185 },
  { month: 'Nov', revenue: 55000, bookings: 161 },
  { month: 'Dec', revenue: 78000, bookings: 230 },
  { month: 'Jan', revenue: 91000, bookings: 274 },
  { month: 'Feb', revenue: 84000, bookings: 252 },
];

export const CATEGORY_DEMAND = [
  { name: 'Plumbing',  value: 28 },
  { name: 'Electrical', value: 22 },
  { name: 'Cleaning',  value: 20 },
  { name: 'Appliance', value: 15 },
  { name: 'Pest',      value: 10 },
  { name: 'Others',    value: 5  },
];

export const INVOICES = [
  { id: 'INV001', service: 'Plumbing',   date: '10 Feb 2025', amount: 420, tax: 21, total: 441, status: 'Paid', method: 'UPI' },
  { id: 'INV002', service: 'Electrical', date: '22 Feb 2025', amount: 400, tax: 20, total: 420, status: 'Due',  method: '—' },
  { id: 'INV003', service: 'Carpentry',  date: '28 Jan 2025', amount: 750, tax: 37, total: 787, status: 'Paid', method: 'Card' },
];

export const ADMIN_STATS = {
  totalRevenue:      418000,
  totalBookings:     1244,
  activeProviders:   86,
  activeCustomers:   524,
  pendingApprovals:  12,
  openDisputes:      4,
  avgRating:         4.6,
  completionRate:    94,
};

export const RECENT_ACTIVITIES = [
  { id: 1, text: 'New booking #B892 for Electrical',    time: '2 min ago',  color: '#7C3AED' },
  { id: 2, text: 'Provider Arun P. requested approval', time: '15 min ago', color: '#F59E0B' },
  { id: 3, text: 'Dispute raised for booking #B845',    time: '1 hr ago',   color: '#EF4444' },
  { id: 4, text: 'Payout of ₹8,400 to Ravi Kumar',     time: '2 hr ago',   color: '#10B981' },
  { id: 5, text: 'Booking #B891 marked Completed',      time: '3 hr ago',   color: '#7C3AED' },
];

export const PROMO_CODES = {
  FIRST50:  { discount: 50,  type: 'percent', desc: '50% off first booking',   minOrder: 200 },
  CLEAN200: { discount: 200, type: 'flat',    desc: '₹200 off cleaning',        minOrder: 600 },
  SUMMER10: { discount: 10,  type: 'percent', desc: '10% seasonal discount',    minOrder: 300 },
};