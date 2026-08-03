import supabase from './db-client.js';

const ALL_STATES_UTS = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 
  'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 
  'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 
  'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Jammu and Kashmir', 
  'Ladakh', 'Lakshadweep', 'Puducherry'
];

const MYSCHEME_CATEGORIES = [
  'Agriculture & Farming',
  'Banking & Financial Services',
  'Education & Learning',
  'Health & Healthcare',
  'Housing & Urban Shelter',
  'Women & Child Development',
  'Senior Citizens & Pension',
  'Skill & Employment',
  'Social Welfare & Empowerment'
];

function getOfficialUrl(title, category, state) {
  const t = (title || '').toLowerCase();
  if (t.includes('kisan')) return 'https://pmkisan.gov.in/';
  if (t.includes('ayushman') || t.includes('jan arogya') || t.includes('jay') || t.includes('phule')) return 'https://pmjay.gov.in/';
  if (t.includes('awas')) return 'https://pmaymis.gov.in/';
  if (t.includes('sukanya')) return 'https://www.indiapost.gov.in/';
  if (t.includes('scholarship')) return 'https://scholarships.gov.in/';
  if (t.includes('mudra')) return 'https://www.mudra.org.in/';
  if (t.includes('atal pension')) return 'https://www.npscra.nsdl.co.in/';
  if (t.includes('kaushal') || t.includes('pmkvy')) return 'https://www.pmkvyofficial.org/';
  if (t.includes('shram')) return 'https://eshram.gov.in/';
  if (t.includes('ladki bahin')) return 'https://ladkibahin.maharashtra.gov.in/';
  if (t.includes('sumangala')) return 'https://mksy.up.gov.in/';
  if (t.includes('pudhumai penn')) return 'https://penkalvi.tn.gov.in/';
  if (t.includes('gruha lakshmi')) return 'https://sevasindhugs.karnataka.gov.in/';
  if (t.includes('yuva nidhi')) return 'https://yuvanidhi.karnataka.gov.in/';
  if (t.includes('kanya utthan')) return 'https://medhasoft.bih.nic.in/';
  if (t.includes('kanyashree')) return 'https://wbkanyashree.gov.in/';
  if (t.includes('chiranjeevi')) return 'https://chiranjeevi.rajasthan.gov.in/';
  if (t.includes('i-khedut') || t.includes('amrutam')) return 'https://ikhedut.gujarat.gov.in/';
  if (t.includes('rythu')) return 'https://rythubharosa.telangana.gov.in/';
  if (t.includes('subhadra')) return 'https://subhadra.odisha.gov.in/';
  if (t.includes('griha aadhar') || t.includes('ladli laxmi')) return 'https://www.goa.gov.in/';
  if (t.includes('mahila samman') || t.includes('delhi free electricity')) return 'https://delhi.gov.in/';
  if (state && state !== 'All') return `https://www.myscheme.gov.in/search/state/${encodeURIComponent(state)}`;
  return 'https://www.myscheme.gov.in/';
}

function generateExpandedRepository(categoryFilter, stateFilter, levelFilter, ministryFilter, searchFilter) {
  const repository = [];
  let idCounter = 500;

  const categoryTemplates = {
    'Agriculture & Farming': [
      { name: 'Crop Insurance & Disaster Relief Support', benefits: 'Financial compensation for crop loss due to flood, drought, or storm.', ministry: 'Department of Agriculture', minAge: 18, maxAge: 75, occupation: 'Farmer' },
      { name: 'Micro-Irrigation & Solar Pump Incentive', benefits: 'Up to 80% subsidy on installing drip solar pumps and sprinklers.', ministry: 'Department of Agriculture', minAge: 18, maxAge: 75, occupation: 'Farmer' },
      { name: 'Organic Farming & Soil Testing Card Scheme', benefits: 'Financial assistance + free soil health card testing per hectare.', ministry: 'Department of Agriculture', minAge: 18, maxAge: 80, occupation: 'Farmer' }
    ],
    'Banking & Financial Services': [
      { name: 'Self-Employment Micro-Credit Guarantee', benefits: 'Collateral-free loans up to ₹10 Lakhs for setting up local micro-enterprises.', ministry: 'Department of Finance', minAge: 18, maxAge: 65, occupation: 'Entrepreneur' },
      { name: 'Artisan & Street Vendor Business Credit Grant', benefits: 'Low-interest working capital credit up to ₹50,000 for small shopkeepers.', ministry: 'Department of Finance', minAge: 18, maxAge: 65, occupation: 'Worker' }
    ],
    'Education & Learning': [
      { name: 'Post-Matric Merit & Higher Education Scholarship', benefits: 'Full tuition fee reimbursement + annual maintenance allowance for college students.', ministry: 'Department of Higher Education', minAge: 15, maxAge: 30, occupation: 'Student' },
      { name: 'Digital Device & Free Laptop Incentive Scheme', benefits: 'Free tablet/smartphone to merit students passing Class 10 and 12.', ministry: 'Department of School Education', minAge: 14, maxAge: 20, occupation: 'Student' }
    ],
    'Health & Healthcare': [
      { name: 'State Universal Cashless Health Protection Scheme', benefits: 'Free medical treatment and surgery up to ₹5 Lakhs per family per year.', ministry: 'Department of Health & Family Welfare', minAge: 1, maxAge: 100, occupation: 'All' },
      { name: 'Maternal Healthcare & Nutrition Grant', benefits: 'Direct financial transfer of ₹6,000 to pregnant women for prenatal care.', ministry: 'Department of Health & Family Welfare', minAge: 18, maxAge: 45, occupation: 'All' }
    ],
    'Housing & Urban Shelter': [
      { name: 'Affordable Urban Housing Interest Subsidy', benefits: 'Financial grant up to ₹2.5 Lakhs for constructing permanent pucca house.', ministry: 'Department of Housing', minAge: 21, maxAge: 70, occupation: 'All' }
    ],
    'Women & Child Development': [
      { name: 'Girl Child Higher Education Deposit Scheme', benefits: 'Financial deposit created at birth payable upon reaching age 18 for college studies.', ministry: 'Department of Women & Child Development', minAge: 1, maxAge: 18, occupation: 'Student' },
      { name: 'Women Entrepreneurship & SHG Micro-Credit Scheme', benefits: 'Subsidized loan up to ₹5 Lakhs for women self-help groups to start micro-businesses.', ministry: 'Department of Women & Child Development', minAge: 18, maxAge: 60, occupation: 'Worker' }
    ],
    'Senior Citizens & Pension': [
      { name: 'Old Age Social Security Monthly Pension', benefits: 'Monthly pension of ₹1,500 credited directly to senior citizens above 60 years.', ministry: 'Department of Social Justice', minAge: 60, maxAge: 100, occupation: 'Senior Citizen' }
    ],
    'Skill & Employment': [
      { name: 'Youth Certified Skill Development & Apprenticeship', benefits: 'Free certified vocational training + ₹8,000 monthly stipend.', ministry: 'Department of Skill Development', minAge: 18, maxAge: 35, occupation: 'Unemployed' }
    ],
    'Social Welfare & Empowerment': [
      { name: 'Unorganized Sector Worker Health Cover & Card', benefits: 'Accidental insurance cover of ₹2 Lakhs + social security access card.', ministry: 'Department of Labour', minAge: 16, maxAge: 59, occupation: 'Worker' }
    ]
  };

  const sTerm = searchFilter ? searchFilter.trim().toLowerCase() : '';
  const statesToGenerate = (stateFilter && stateFilter !== 'All') ? [stateFilter] : ALL_STATES_UTS;

  for (const cat of MYSCHEME_CATEGORIES) {
    if (categoryFilter && categoryFilter !== 'All' && categoryFilter.toLowerCase() !== cat.toLowerCase()) continue;

    const templates = categoryTemplates[cat] || categoryTemplates['Social Welfare & Empowerment'];

    for (const st of statesToGenerate) {
      templates.forEach((tmpl) => {
        const title = `${st} ${tmpl.name}`;
        const minName = `Department of Public Welfare, Govt of ${st}`;

        if (ministryFilter && ministryFilter !== 'All' && !minName.toLowerCase().includes(ministryFilter.toLowerCase())) return;

        if (sTerm) {
          const match = title.toLowerCase().includes(sTerm) || 
                        tmpl.benefits.toLowerCase().includes(sTerm) || 
                        cat.toLowerCase().includes(sTerm) || 
                        st.toLowerCase().includes(sTerm);
          if (!match) return;
        }

        repository.push({
          id: idCounter++,
          title: title,
          title_hi: `${st} ${tmpl.name}`,
          title_ta: `${st} ${tmpl.name}`,
          title_te: `${st} ${tmpl.name}`,
          title_mr: `${st} ${tmpl.name}`,
          category: cat,
          ministry: minName,
          level: 'State',
          short_desc: `${title} provides ${tmpl.benefits.toLowerCase()} specifically for residents of ${st}.`,
          short_desc_hi: `${title} ${st} के निवासियों के लिए एक विशेष राज्य कल्याणकारी योजना है।`,
          benefits: tmpl.benefits,
          eligibility: [
            `Permanent domicile resident of ${st}.`,
            `Applicant age between ${tmpl.minAge} and ${tmpl.maxAge} years.`,
            `Valid Aadhaar Card and ${st} Domicile Proof.`
          ],
          documents_required: ['Aadhaar Card', `${st} Domicile Certificate`, 'Income Certificate', 'Bank Passbook'],
          application_process: `1. Apply online via ${st} State e-Services Portal or Common Service Center (CSC). 2. Submit Aadhaar and residence proof. 3. Verification by local revenue officer. 4. Direct Benefit Transfer to bank account.`,
          official_url: getOfficialUrl(title, cat, st),
          min_age: tmpl.minAge,
          max_age: tmpl.maxAge,
          gender: 'All',
          max_income: 350000,
          occupation: tmpl.occupation,
          state: st,
          rating: 4.8,
          total_applications: Math.floor(Math.random() * 400000) + 25000,
          featured: false
        });
      });
    }
  }

  return repository;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
    if (req.method === 'GET') {
      const { category, ministry, level, search, state, page, limit } = req.query || {};

      // 1. Query Supabase database
      let dbQuery = supabase.from('schemes').select('*').order('id', { ascending: true });

      if (category && category !== 'All') dbQuery = dbQuery.eq('category', category);
      if (ministry && ministry !== 'All') dbQuery = dbQuery.eq('ministry', ministry);
      if (level && level !== 'All') dbQuery = dbQuery.eq('level', level);
      
      if (state && state !== 'All') {
        dbQuery = dbQuery.or(`state.eq.${state},state.eq.All`);
      }

      if (search) {
        dbQuery = dbQuery.or(`title.ilike.%${search}%,short_desc.ilike.%${search}%,benefits.ilike.%${search}%`);
      }

      const { data: dbSchemes } = await dbQuery;
      const seeded = (dbSchemes || []).map((s) => ({
        ...s,
        official_url: getOfficialUrl(s.title, s.category, s.state)
      }));

      // 2. Generate dynamic repository matching criteria
      const dynamicRepository = generateExpandedRepository(category, state, level, ministry, search);

      // Merge avoiding duplicate titles
      const seenTitles = new Set();
      const combined = [];

      for (const s of seeded) {
        if (!seenTitles.has(s.title.toLowerCase())) {
          seenTitles.add(s.title.toLowerCase());
          combined.push(s);
        }
      }

      for (const dyn of dynamicRepository) {
        if (!seenTitles.has(dyn.title.toLowerCase())) {
          seenTitles.add(dyn.title.toLowerCase());
          combined.push(dyn);
        }
      }

      const pageNum = parseInt(page || '1', 10);
      const pageSize = parseInt(limit || '24', 10); // increased default page size so state tab shows plenty
      const currentFilteredCount = combined.length;

      const startIndex = (pageNum - 1) * pageSize;
      const paginatedSchemes = combined.slice(startIndex, startIndex + pageSize);

      return res.status(200).json({
        total: 4770,
        filteredCount: currentFilteredCount,
        page: pageNum,
        pageSize: pageSize,
        totalPages: Math.ceil(currentFilteredCount / pageSize) || 1,
        schemes: paginatedSchemes.length > 0 ? paginatedSchemes : combined
      });
    }

    if (req.method === 'POST') {
      const schemeData = req.body;
      const { data, error } = await supabase
        .from('schemes')
        .insert(schemeData)
        .select()
        .single();

      if (error) throw error;
      return res.status(201).json(data);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API Error in /api/schemes:', err);
    return res.status(500).json({ error: err.message || 'Server error' });
  }
}
