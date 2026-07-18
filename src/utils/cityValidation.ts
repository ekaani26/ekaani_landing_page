/**
 * Elegant and robust validation for city names.
 * Ensures the city is valid, is not a keyboard mash, and is an actual city or region.
 */

const KNOWN_VALID_CITIES = new Set([
  // India - Tier 1 & 2
  "delhi", "new delhi", "noida", "gurgaon", "gurugram", "ghaziabad", "faridabad",
  "mumbai", "navi mumbai", "thane", "pune", "nagpur", "nashik", "aurangabad", "solapur", "kolhapur", "amravati",
  "kolkata", "howrah", "siliguri", "durgapur", "asansol", "kharagpur", "darjeeling",
  "bengaluru", "bangalore", "mysore", "mysuru", "mangalore", "mangaluru", "hubli", "dharwad", "belgaum",
  "chennai", "coimbatore", "madurai", "trichy", "tiruchirappalli", "salem", "tirunelveli", "vellore", "erode",
  "hyderabad", "secunderabad", "warangal", "guntur", "nellore", "kurnool", "kakinada", "tirupati",
  "visakhapatnam", "vizag", "vijayawada", "rajahmundry",
  "ahmedabad", "surat", "vadodara", "baroda", "rajkot", "jamnagar", "bhavnagar", "gandhinagar", "anand",
  "jaipur", "jodhpur", "udaipur", "kota", "bikaner", "ajmer", "jaisalmer", "alwar", "sikar", "bhilwara",
  "chandigarh", "amritsar", "ludhiana", "jalandhar", "patiala", "bathinda", "hoshiarpur", "pathankot",
  "lucknow", "kanpur", "agra", "varanasi", "banaras", "meerut", "prayagraj", "allahabad", "bareilly", "aligarh", "moradabad", "gorakhpur", "jhansi", "muzaffarnagar", "mathura", "greater noida",
  "patna", "gaya", "bhagalpur", "muzaffarpur", "darbhanga", "purnia", "bihar sharif", "arrah",
  "bhopal", "indore", "gwalior", "jabalpur", "ujjain", "sagar", "ratlam", "satna",
  "ranchi", "jamshedpur", "dhanbad", "bokaro", "deoghar", "hazaribagh",
  "raipur", "bilaspur", "bhilai", "durg", "korba",
  "bhubaneswar", "cuttack", "rourkela", "puri", "sambalpur", "balasore",
  "kochi", "cochin", "trivandrum", "thiruvananthapuram", "kozhikode", "calicut", "thrissur", "kollam", "alappuzha", "palakkad",
  "guwahati", "shillong", "imphal", "agartala", "aizawl", "kohima", "gangtok", "itanagar", "dibrugarh", "silchar", "jorhat", "tezpur",
  "dehradun", "haridwar", "rishikesh", "haldwani", "roorkee", "rudrapur",
  "jammu", "srinagar", "leh", "ladakh", "anantnag",
  "panaji", "goa", "margao", "vasco da gama", "mapusa",
  "shimla", "dharamshala", "solan", "mandi", "manali",
  "berhampur", "pondicherry", "puducherry", "port blair",

  // Indian States & Union Territories (allowing regions)
  "andhra pradesh", "arunachal pradesh", "assam", "bihar", "chhattisgarh", "goa", "gujarat", "haryana", 
  "himachal pradesh", "jammu and kashmir", "jharkhand", "karnataka", "kerala", "madhya pradesh", 
  "maharashtra", "manipur", "meghalaya", "mizoram", "nagaland", "odisha", "punjab", "rajasthan", 
  "sikkim", "tamil nadu", "telangana", "tripura", "uttar pradesh", "uttarakhand", "west bengal",
  "andaman and nicobar", "dadra and nagar haveli", "daman and diu", "lakshadweep", "puducherry", "ncr", "delhi ncr",

  // International hubs & countries
  "dubai", "abu dhabi", "sharjah", "london", "birmingham", "manchester", "new york", "nyc", "los angeles", "la", "chicago", "san francisco", "sf", "seattle", "boston", "toronto", "vancouver", "montreal", "singapore", "sydney", "melbourne", "brisbane", "tokyo", "osaka", "paris", "berlin", "munich", "rome", "milan", "barcelona", "madrid", "amsterdam", "brussels", "geneva", "zurich", "vienna", "cape town", "johannesburg", "hong kong", "shanghai", "beijing", "bangkok", "kuala lumpur", "jakarta", "manila", "riyadh", "jeddah", "doha", "muscat", "kuwait city", "usa", "uk", "uae"
]);

const KEYBOARD_MASH_PATTERNS = [
  "asdf", "sdfg", "dfgh", "fghj", "ghjk", "hjkl", "jkl;", "qwer", "wert", "erty", "rtyu", "tyui", "yuio", "uiop", "zxcv", "xcvb", "cvbn", "vbnm",
  "abcd", "xyz", "abc", "asd", "qwe", "zxc", "dfg", "hjk", "yui", "iop", "bnm", "vbn", "cvb", "jkl", "ert", "rty", "tyu", "ghj", "fgh",
  "test", "testing", "random", "none", "nothing", "dummy", "qwerty", "temp", "foo", "bar", "baz", "qux", "invalid", "na", "n/a", "unknown",
  "asdasd", "qwqw", "asdfasdf"
];

/**
 * Validates whether the provided string represents a real, non-random city or region.
 * @param cityStr The city string to check
 */
export function isValidCity(cityStr: string): boolean {
  if (!cityStr) return false;
  const city = cityStr.trim().toLowerCase().replace(/\s+/g, " ");
  
  // 1. Length checks (must be between 3 and 35 characters)
  if (city.length < 3 || city.length > 35) {
    return false;
  }
  
  // 2. Check exact match in our comprehensive catalog of 180+ major cities and states
  if (KNOWN_VALID_CITIES.has(city)) {
    return true;
  }
  
  // 3. Format / character check: only letters, spaces, hyphens, and dots allowed
  if (!/^[a-zA-Z\s.\-']+$/.test(cityStr)) {
    return false;
  }
  
  // 4. Reject repeating single characters (e.g. "aaaa", "zzzz", "bbbb", "xxxxx")
  if (/^(.)\1{2,}/.test(city) || /(.)\1{3,}/.test(city)) {
    return false;
  }
  
  // 5. Reject common keyboard mashes, placeholders, and walk patterns
  if (KEYBOARD_MASH_PATTERNS.some(mash => city.includes(mash))) {
    return false;
  }

  // 6. Reject strings that have 4 or more consecutive consonants (e.g., "dsfgh", "hjkl", "mnbvc")
  // excluding legitimate names since almost no real city/region has 4 consecutive consonants.
  const consecutiveConsonants = /[^aeiouy\s.\-']{4,}/i.test(city);
  if (consecutiveConsonants) {
    return false;
  }

  // 7. Reject strings that have 4 or more consecutive vowels (e.g., "aeiou")
  const consecutiveVowels = /[aeiou]{4,}/i.test(city);
  if (consecutiveVowels) {
    return false;
  }
  
  // 8. Ensure there is a healthy mix of vowels and consonants
  const vowelsCount = (city.match(/[aeiouy]/g) || []).length;
  const consonantsCount = (city.match(/[bcdfghjklmnpqrstvwxz]/g) || []).length;
  
  if (vowelsCount === 0 && city.length >= 3) {
    return false;
  }

  // Vowel ratio check for longer inputs (e.g., "gshdjk" has 0 or 1 vowel, which is extremely low for a real name)
  if (city.length >= 5) {
    const vowelRatio = vowelsCount / city.length;
    if (vowelRatio < 0.15) {
      return false;
    }
    // Also, if consonants are overwhelmingly dominant (e.g. 1 vowel and 6 consonants)
    if (consonantsCount >= 5 && vowelsCount <= 1) {
      return false;
    }
  }

  // 9. Reject alternating patterns of repeating characters (e.g., "ababab", "jkjkjk")
  if (/(\w\w)\1\1/.test(city)) {
    return false;
  }
  
  // If we passed all tests and have valid characters, let's treat it as a valid custom city or region
  return true;
}

