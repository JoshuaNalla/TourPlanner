package com.example.demo.FlightAPI;

import java.util.*;

public class AirportDatabase {

    private static final Map<String, List<AirportInfo>> AIRPORT_MAP = new HashMap<>();

    static {
        // ========== UNITED STATES ==========

        // New York
        addAirport("New York", "JFK", "KJFK", "John F. Kennedy International Airport", "United States");
        addAirport("New York", "LGA", "KLGA", "LaGuardia Airport", "United States");
        addAirport("New York", "EWR", "KEWR", "Newark Liberty International Airport", "United States");

        // Los Angeles
        addAirport("Los Angeles", "LAX", "KLAX", "Los Angeles International Airport", "United States");
        addAirport("Los Angeles", "BUR", "KBUR", "Hollywood Burbank Airport", "United States");
        addAirport("Los Angeles", "ONT", "KONT", "Ontario International Airport", "United States");
        addAirport("Los Angeles", "SNA", "KSNA", "John Wayne Airport", "United States");
        addAirport("Los Angeles", "LGB", "KLGB", "Long Beach Airport", "United States");

        // Chicago
        addAirport("Chicago", "ORD", "KORD", "O'Hare International Airport", "United States");
        addAirport("Chicago", "MDW", "KMDW", "Midway International Airport", "United States");

        // San Francisco
        addAirport("San Francisco", "SFO", "KSFO", "San Francisco International Airport", "United States");
        addAirport("San Francisco", "OAK", "KOAK", "Oakland International Airport", "United States");
        addAirport("San Francisco", "SJC", "KSJC", "San Jose International Airport", "United States");

        // Miami
        addAirport("Miami", "MIA", "KMIA", "Miami International Airport", "United States");
        addAirport("Miami", "FLL", "KFLL", "Fort Lauderdale-Hollywood International Airport", "United States");
        addAirport("Miami", "PBI", "KPBI", "Palm Beach International Airport", "United States");

        // Atlanta
        addAirport("Atlanta", "ATL", "KATL", "Hartsfield-Jackson Atlanta International Airport", "United States");

        // Boston
        addAirport("Boston", "BOS", "KBOS", "Logan International Airport", "United States");

        // Seattle
        addAirport("Seattle", "SEA", "KSEA", "Seattle-Tacoma International Airport", "United States");

        // Denver
        addAirport("Denver", "DEN", "KDEN", "Denver International Airport", "United States");

        // Dallas
        addAirport("Dallas", "DFW", "KDFW", "Dallas/Fort Worth International Airport", "United States");
        addAirport("Dallas", "DAL", "KDAL", "Dallas Love Field", "United States");

        // Las Vegas
        addAirport("Las Vegas", "LAS", "KLAS", "Harry Reid International Airport", "United States");

        // Phoenix
        addAirport("Phoenix", "PHX", "KPHX", "Phoenix Sky Harbor International Airport", "United States");

        // Houston
        addAirport("Houston", "IAH", "KIAH", "George Bush Intercontinental Airport", "United States");
        addAirport("Houston", "HOU", "KHOU", "William P. Hobby Airport", "United States");

        // Orlando
        addAirport("Orlando", "MCO", "KMCO", "Orlando International Airport", "United States");

        // Philadelphia
        addAirport("Philadelphia", "PHL", "KPHL", "Philadelphia International Airport", "United States");

        // Washington DC
        addAirport("Washington", "DCA", "KDCA", "Ronald Reagan Washington National Airport", "United States");
        addAirport("Washington", "IAD", "KIAD", "Washington Dulles International Airport", "United States");
        addAirport("Washington", "BWI", "KBWI", "Baltimore/Washington International Airport", "United States");

        // Detroit
        addAirport("Detroit", "DTW", "KDTW", "Detroit Metropolitan Wayne County Airport", "United States");

        // Minneapolis
        addAirport("Minneapolis", "MSP", "KMSP", "Minneapolis-St Paul International Airport", "United States");

        // San Diego
        addAirport("San Diego", "SAN", "KSAN", "San Diego International Airport", "United States");

        // Tampa
        addAirport("Tampa", "TPA", "KTPA", "Tampa International Airport", "United States");

        // Portland
        addAirport("Portland", "PDX", "KPDX", "Portland International Airport", "United States");

        // St. Louis
        addAirport("St. Louis", "STL", "KSTL", "St. Louis Lambert International Airport", "United States");

        // Charlotte
        addAirport("Charlotte", "CLT", "KCLT", "Charlotte Douglas International Airport", "United States");

        // Salt Lake City
        addAirport("Salt Lake City", "SLC", "KSLC", "Salt Lake City International Airport", "United States");

        // Nashville
        addAirport("Nashville", "BNA", "KBNA", "Nashville International Airport", "United States");

        // Austin
        addAirport("Austin", "AUS", "KAUS", "Austin-Bergstrom International Airport", "United States");

        // Raleigh
        addAirport("Raleigh", "RDU", "KRDU", "Raleigh-Durham International Airport", "United States");

        // New Orleans
        addAirport("New Orleans", "MSY", "KMSY", "Louis Armstrong New Orleans International Airport", "United States");

        // Cleveland
        addAirport("Cleveland", "CLE", "KCLE", "Cleveland Hopkins International Airport", "United States");

        // Pittsburgh
        addAirport("Pittsburgh", "PIT", "KPIT", "Pittsburgh International Airport", "United States");

        // Cincinnati
        addAirport("Cincinnati", "CVG", "KCVG", "Cincinnati/Northern Kentucky International Airport", "United States");

        // Kansas City
        addAirport("Kansas City", "MCI", "KMCI", "Kansas City International Airport", "United States");

        // Columbus
        addAirport("Columbus", "CMH", "KCMH", "John Glenn Columbus International Airport", "United States");

        // Indianapolis
        addAirport("Indianapolis", "IND", "KIND", "Indianapolis International Airport", "United States");

        // San Antonio
        addAirport("San Antonio", "SAT", "KSAT", "San Antonio International Airport", "United States");

        // Sacramento
        addAirport("Sacramento", "SMF", "KSMF", "Sacramento International Airport", "United States");

        // Milwaukee
        addAirport("Milwaukee", "MKE", "KMKE", "Milwaukee Mitchell International Airport", "United States");

        // Jacksonville
        addAirport("Jacksonville", "JAX", "KJAX", "Jacksonville International Airport", "United States");

        // Memphis
        addAirport("Memphis", "MEM", "KMEM", "Memphis International Airport", "United States");

        // Honolulu
        addAirport("Honolulu", "HNL", "PHNL", "Daniel K. Inouye International Airport", "United States");

        // Anchorage
        addAirport("Anchorage", "ANC", "PANC", "Ted Stevens Anchorage International Airport", "United States");

        // Buffalo
        addAirport("Buffalo", "BUF", "KBUF", "Buffalo Niagara International Airport", "United States");

        // Baltimore
        addAirport("Baltimore", "BWI", "KBWI", "Baltimore/Washington International Airport", "United States");

        // Albuquerque
        addAirport("Albuquerque", "ABQ", "KABQ", "Albuquerque International Sunport", "United States");

        // Omaha
        addAirport("Omaha", "OMA", "KOMA", "Eppley Airfield", "United States");

        // Tucson
        addAirport("Tucson", "TUS", "KTUS", "Tucson International Airport", "United States");

        // El Paso
        addAirport("El Paso", "ELP", "KELP", "El Paso International Airport", "United States");

        // Oklahoma City
        addAirport("Oklahoma City", "OKC", "KOKC", "Will Rogers World Airport", "United States");

        // Richmond
        addAirport("Richmond", "RIC", "KRIC", "Richmond International Airport", "United States");

        // Louisville
        addAirport("Louisville", "SDF", "KSDF", "Louisville Muhammad Ali International Airport", "United States");

        // Birmingham
        addAirport("Birmingham", "BHM", "KBHM", "Birmingham-Shuttlesworth International Airport", "United States");

        // Boise
        addAirport("Boise", "BOI", "KBOI", "Boise Airport", "United States");


        // ========== CANADA ==========

        addAirport("Toronto", "YYZ", "CYYZ", "Toronto Pearson International Airport", "Canada");
        addAirport("Toronto", "YTZ", "CYTZ", "Billy Bishop Toronto City Airport", "Canada");

        addAirport("Vancouver", "YVR", "CYVR", "Vancouver International Airport", "Canada");

        addAirport("Montreal", "YUL", "CYUL", "Montréal-Pierre Elliott Trudeau International Airport", "Canada");

        addAirport("Calgary", "YYC", "CYYC", "Calgary International Airport", "Canada");

        addAirport("Edmonton", "YEG", "CYEG", "Edmonton International Airport", "Canada");

        addAirport("Ottawa", "YOW", "CYOW", "Ottawa Macdonald-Cartier International Airport", "Canada");

        addAirport("Winnipeg", "YWG", "CYWG", "Winnipeg Richardson International Airport", "Canada");

        addAirport("Quebec City", "YQB", "CYQB", "Québec City Jean Lesage International Airport", "Canada");

        addAirport("Halifax", "YHZ", "CYHZ", "Halifax Stanfield International Airport", "Canada");


        // ========== UNITED KINGDOM ==========

        addAirport("London", "LHR", "EGLL", "London Heathrow Airport", "United Kingdom");
        addAirport("London", "LGW", "EGKK", "London Gatwick Airport", "United Kingdom");
        addAirport("London", "STN", "EGSS", "London Stansted Airport", "United Kingdom");
        addAirport("London", "LCY", "EGLC", "London City Airport", "United Kingdom");
        addAirport("London", "LTN", "EGGW", "London Luton Airport", "United Kingdom");

        addAirport("Manchester", "MAN", "EGCC", "Manchester Airport", "United Kingdom");

        addAirport("Edinburgh", "EDI", "EGPH", "Edinburgh Airport", "United Kingdom");

        addAirport("Birmingham", "BHX", "EGBB", "Birmingham Airport", "United Kingdom");

        addAirport("Glasgow", "GLA", "EGPF", "Glasgow Airport", "United Kingdom");

        addAirport("Bristol", "BRS", "EGGD", "Bristol Airport", "United Kingdom");


        // ========== EUROPE ==========

        // France
        addAirport("Paris", "CDG", "LFPG", "Charles de Gaulle Airport", "France");
        addAirport("Paris", "ORY", "LFPO", "Paris Orly Airport", "France");

        addAirport("Nice", "NCE", "LFMN", "Nice Côte d'Azur Airport", "France");

        addAirport("Lyon", "LYS", "LFLL", "Lyon-Saint Exupéry Airport", "France");

        addAirport("Marseille", "MRS", "LFML", "Marseille Provence Airport", "France");

        // Germany
        addAirport("Berlin", "BER", "EDDB", "Berlin Brandenburg Airport", "Germany");

        addAirport("Frankfurt", "FRA", "EDDF", "Frankfurt Airport", "Germany");

        addAirport("Munich", "MUC", "EDDM", "Munich Airport", "Germany");

        addAirport("Hamburg", "HAM", "EDDH", "Hamburg Airport", "Germany");

        addAirport("Cologne", "CGN", "EDDK", "Cologne Bonn Airport", "Germany");

        addAirport("Dusseldorf", "DUS", "EDDL", "Düsseldorf Airport", "Germany");

        // Spain
        addAirport("Madrid", "MAD", "LEMD", "Adolfo Suárez Madrid-Barajas Airport", "Spain");

        addAirport("Barcelona", "BCN", "LEBL", "Barcelona-El Prat Airport", "Spain");

        addAirport("Malaga", "AGP", "LEMG", "Málaga Airport", "Spain");

        addAirport("Valencia", "VLC", "LEVC", "Valencia Airport", "Spain");

        addAirport("Seville", "SVQ", "LEZL", "Seville Airport", "Spain");

        // Italy
        addAirport("Rome", "FCO", "LIRF", "Leonardo da Vinci-Fiumicino Airport", "Italy");
        addAirport("Rome", "CIA", "LIRA", "Ciampino Airport", "Italy");

        addAirport("Milan", "MXP", "LIMC", "Milan Malpensa Airport", "Italy");
        addAirport("Milan", "LIN", "LIML", "Milan Linate Airport", "Italy");

        addAirport("Venice", "VCE", "LIPZ", "Venice Marco Polo Airport", "Italy");

        addAirport("Naples", "NAP", "LIRN", "Naples International Airport", "Italy");

        addAirport("Florence", "FLR", "LIRQ", "Florence Airport", "Italy");

        // Netherlands
        addAirport("Amsterdam", "AMS", "EHAM", "Amsterdam Airport Schiphol", "Netherlands");

        // Switzerland
        addAirport("Zurich", "ZRH", "LSZH", "Zurich Airport", "Switzerland");

        addAirport("Geneva", "GVA", "LSGG", "Geneva Airport", "Switzerland");

        // Belgium
        addAirport("Brussels", "BRU", "EBBR", "Brussels Airport", "Belgium");

        // Austria
        addAirport("Vienna", "VIE", "LOWW", "Vienna International Airport", "Austria");

        // Greece
        addAirport("Athens", "ATH", "LGAV", "Athens International Airport", "Greece");

        // Portugal
        addAirport("Lisbon", "LIS", "LPPT", "Lisbon Portela Airport", "Portugal");

        addAirport("Porto", "OPO", "LPPR", "Francisco Sá Carneiro Airport", "Portugal");

        // Ireland
        addAirport("Dublin", "DUB", "EIDW", "Dublin Airport", "Ireland");

        // Denmark
        addAirport("Copenhagen", "CPH", "EKCH", "Copenhagen Airport", "Denmark");

        // Sweden
        addAirport("Stockholm", "ARN", "ESSA", "Stockholm Arlanda Airport", "Sweden");

        // Norway
        addAirport("Oslo", "OSL", "ENGM", "Oslo Airport", "Norway");

        // Finland
        addAirport("Helsinki", "HEL", "EFHK", "Helsinki-Vantaa Airport", "Finland");

        // Poland
        addAirport("Warsaw", "WAW", "EPWA", "Warsaw Chopin Airport", "Poland");

        // Czech Republic
        addAirport("Prague", "PRG", "LKPR", "Václav Havel Airport Prague", "Czech Republic");

        // Russia
        addAirport("Moscow", "SVO", "UUEE", "Sheremetyevo International Airport", "Russia");
        addAirport("Moscow", "DME", "UUDD", "Domodedovo International Airport", "Russia");


        // ========== ASIA ==========

        // Japan
        addAirport("Tokyo", "NRT", "RJAA", "Narita International Airport", "Japan");
        addAirport("Tokyo", "HND", "RJTT", "Tokyo Haneda Airport", "Japan");

        addAirport("Osaka", "KIX", "RJBB", "Kansai International Airport", "Japan");
        addAirport("Osaka", "ITM", "RJOO", "Osaka International Airport", "Japan");

        addAirport("Nagoya", "NGO", "RJGG", "Chubu Centrair International Airport", "Japan");

        // China
        addAirport("Beijing", "PEK", "ZBAA", "Beijing Capital International Airport", "China");
        addAirport("Beijing", "PKX", "ZBAD", "Beijing Daxing International Airport", "China");

        addAirport("Shanghai", "PVG", "ZSPD", "Shanghai Pudong International Airport", "China");
        addAirport("Shanghai", "SHA", "ZSSS", "Shanghai Hongqiao International Airport", "China");

        addAirport("Guangzhou", "CAN", "ZGGG", "Guangzhou Baiyun International Airport", "China");

        addAirport("Shenzhen", "SZX", "ZGSZ", "Shenzhen Bao'an International Airport", "China");

        addAirport("Hong Kong", "HKG", "VHHH", "Hong Kong International Airport", "Hong Kong");

        // South Korea
        addAirport("Seoul", "ICN", "RKSI", "Incheon International Airport", "South Korea");
        addAirport("Seoul", "GMP", "RKSS", "Gimpo International Airport", "South Korea");

        // Singapore
        addAirport("Singapore", "SIN", "WSSS", "Singapore Changi Airport", "Singapore");

        // Thailand
        addAirport("Bangkok", "BKK", "VTBS", "Suvarnabhumi Airport", "Thailand");
        addAirport("Bangkok", "DMK", "VTBD", "Don Mueang International Airport", "Thailand");

        // Malaysia
        addAirport("Kuala Lumpur", "KUL", "WMKK", "Kuala Lumpur International Airport", "Malaysia");

        // Indonesia
        addAirport("Jakarta", "CGK", "WIII", "Soekarno-Hatta International Airport", "Indonesia");

        // Philippines
        addAirport("Manila", "MNL", "RPLL", "Ninoy Aquino International Airport", "Philippines");

        // Vietnam
        addAirport("Ho Chi Minh City", "SGN", "VVTS", "Tan Son Nhat International Airport", "Vietnam");

        addAirport("Hanoi", "HAN", "VVNB", "Noi Bai International Airport", "Vietnam");

        // India
        addAirport("Delhi", "DEL", "VIDP", "Indira Gandhi International Airport", "India");

        addAirport("Mumbai", "BOM", "VABB", "Chhatrapati Shivaji Maharaj International Airport", "India");

        addAirport("Bangalore", "BLR", "VOBL", "Kempegowda International Airport", "India");

        // UAE
        addAirport("Dubai", "DXB", "OMDB", "Dubai International Airport", "United Arab Emirates");
        addAirport("Dubai", "DWC", "OMDW", "Al Maktoum International Airport", "United Arab Emirates");

        addAirport("Abu Dhabi", "AUH", "OMAA", "Abu Dhabi International Airport", "United Arab Emirates");

        // Qatar
        addAirport("Doha", "DOH", "OTHH", "Hamad International Airport", "Qatar");

        // Turkey
        addAirport("Istanbul", "IST", "LTFM", "Istanbul Airport", "Turkey");
        addAirport("Istanbul", "SAW", "LTFJ", "Sabiha Gökçen International Airport", "Turkey");


        // ========== AUSTRALIA / NEW ZEALAND ==========

        addAirport("Sydney", "SYD", "YSSY", "Sydney Kingsford Smith Airport", "Australia");

        addAirport("Melbourne", "MEL", "YMML", "Melbourne Airport", "Australia");

        addAirport("Brisbane", "BNE", "YBBN", "Brisbane Airport", "Australia");

        addAirport("Perth", "PER", "YPPH", "Perth Airport", "Australia");

        addAirport("Adelaide", "ADL", "YPAD", "Adelaide Airport", "Australia");

        addAirport("Auckland", "AKL", "NZAA", "Auckland Airport", "New Zealand");

        addAirport("Wellington", "WLG", "NZWN", "Wellington International Airport", "New Zealand");

        addAirport("Christchurch", "CHC", "NZCH", "Christchurch International Airport", "New Zealand");


        // ========== LATIN AMERICA ==========

        // Mexico
        addAirport("Mexico City", "MEX", "MMMX", "Mexico City International Airport", "Mexico");

        addAirport("Cancun", "CUN", "MMUN", "Cancún International Airport", "Mexico");

        addAirport("Guadalajara", "GDL", "MMGL", "Guadalajara International Airport", "Mexico");

        addAirport("Monterrey", "MTY", "MMMY", "Monterrey International Airport", "Mexico");

        // Brazil
        addAirport("Sao Paulo", "GRU", "SBGR", "São Paulo/Guarulhos International Airport", "Brazil");
        addAirport("Sao Paulo", "CGH", "SBSP", "Congonhas Airport", "Brazil");

        addAirport("Rio de Janeiro", "GIG", "SBGL", "Rio de Janeiro/Galeão International Airport", "Brazil");
        addAirport("Rio de Janeiro", "SDU", "SBRJ", "Santos Dumont Airport", "Brazil");

        addAirport("Brasilia", "BSB", "SBBR", "Brasília International Airport", "Brazil");

        // Argentina
        addAirport("Buenos Aires", "EZE", "SAEZ", "Ministro Pistarini International Airport", "Argentina");
        addAirport("Buenos Aires", "AEP", "SABE", "Jorge Newbery Airpark", "Argentina");

        // Chile
        addAirport("Santiago", "SCL", "SCEL", "Arturo Merino Benítez International Airport", "Chile");

        // Colombia
        addAirport("Bogota", "BOG", "SKBO", "El Dorado International Airport", "Colombia");

        // Peru
        addAirport("Lima", "LIM", "SPIM", "Jorge Chávez International Airport", "Peru");


        // ========== MIDDLE EAST / AFRICA ==========

        // Israel
        addAirport("Tel Aviv", "TLV", "LLBG", "Ben Gurion Airport", "Israel");

        // Egypt
        addAirport("Cairo", "CAI", "HECA", "Cairo International Airport", "Egypt");

        // South Africa
        addAirport("Johannesburg", "JNB", "FAJS", "O.R. Tambo International Airport", "South Africa");

        addAirport("Cape Town", "CPT", "FACT", "Cape Town International Airport", "South Africa");

        // Kenya
        addAirport("Nairobi", "NBO", "HKJK", "Jomo Kenyatta International Airport", "Kenya");

        // Morocco
        addAirport("Casablanca", "CMN", "GMMN", "Mohammed V International Airport", "Morocco");
    }

    private static void addAirport(String city, String iata, String icao, String airportName, String country) {
        AirportInfo info = new AirportInfo();
        info.setCity_name(city);
        info.setIata_code(iata);
        info.setIcao_code(icao);
        info.setAirport_name(airportName);
        info.setCountry_name(country);

        AIRPORT_MAP.computeIfAbsent(city.toLowerCase(), k -> new ArrayList<>()).add(info);
    }

    public static List<AirportInfo> searchByCity(String city) {
        if (city == null || city.trim().isEmpty()) {
            return Collections.emptyList();
        }
        return AIRPORT_MAP.getOrDefault(city.toLowerCase().trim(), Collections.emptyList());
    }

    public static List<String> getAllCities() {
        List<String> cities = new ArrayList<>(AIRPORT_MAP.keySet());
        Collections.sort(cities);
        return cities;
    }

    public static boolean hasCity(String city) {
        if (city == null) return false;
        return AIRPORT_MAP.containsKey(city.toLowerCase().trim());
    }
}
