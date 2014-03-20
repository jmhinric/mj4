class Game < ActiveRecord::Base
  has_many :rounds

  def category_list
    @category_lists = []
    @category_lists << ["A boy's name", "A river", "An animal", "Things that are cold", "Insects", "TV Shows", "Things that grow", "Fruits", "Things that are black", "School subjects", "Movie Titles", "Musical Instruments"]
    @category_lists << ["Authors", "Bodies of Water", "A Bird", "Countries", "Cartoon Characters", "Holidays", "Things that Are Square", "In the NWT (Northwest Territories, Canada)", "Clothing", "A relative", "Games", "Sports Stars"]
    @category_lists << ["School supplies", "Things that are hot", "Heroes", "A girl's name", "Fears", "TV Stars", "Colors", "A fish", "Fruits", "Provinces or States", "Sports Equipment", "Tools"]
    @category_lists << ["Breakfast Foods", "Gifts", "Flowers", "Ice Cream Flavors", "A drink", "Toys", "Cities", "Things in the Kitchen", "Ocean Things", "Nicknames", "Hobbies", "Parts of the body"]
    @category_lists << ["Sandwiches", "Items in a Catalog", "World Leaders/Politicians", "School Subjects", "Excuses for Being late", "Ice cream flavors", "Things that Jump/Bounce", "TV Stars", "Things in a Park", "Foreign Cities", "Stones/Gems", "Musical Instruments"]
    @category_lists << ["Nicknames", "Things in the Sky", "Pizza toppings", "Colleges/Universities", "Fish", "Countries", "Things that have spots", "Historical Figures", "Something You're Afraid Of", "Terms of Endearment", "Items in This Room", "Drugs that are abused"]
    # @category_lists[:list_seven] = ["Fictional Characters", "Menu items", "Magazines", "Capitals", "Kinds of Candy", "Items You Save Up to Buy", "Footware", "Something You Keep Hidden", "Items in a Suitcase", "Things with Tails", "Sports Equipment", "Crimes"]
    # @category_lists[:list_eight] = ["Things that are Sticky", "Awards/Ceremonies", "Cars", "Spices/Herbs", "Bad Habits", "Cosmetics/Toiletries", "Celebrities", "Cooking Utensils", "Reptiles/Amphibians", "Parks", "Leisue Activities", "Things You're Allergic To"]
    # @category_lists[:list_nine] = ["Restaurants", "Notorious People", "Fruits", "Things in a Medicine Cabinet", "Toys", "Household Chores", "Bodies of Water", "Authors", "Halloween Costumes", "Weapons", "Things that are Round", "Words Associated with Exercise"]
    # @category_lists[:list_ten] = ["Sports", "Song titles", "Parts of the Body", "Ethnic Foods", "Things you Shout", "Birds", "A girl's name", "Ways to get from here to there", "Items in a Kitchen", "Villains", "Flowers", "Things you Replace"]
    # @category_lists[:list_eleven] = ["Baby Foods", "Famous duos and trios", "Things found in a desk", "Vacation Spots", "Diseases", "Words Associated with Money", "Items in a Vending Machine", "Movie Titles", "Games", "Things you Wear", "Beers", "Things at a Circus"]
    # @category_lists[:list_twelve] = ["Vegetables", "States", "Things you throw away", "Occupations", "Appliances", "Cartoon Characters", "Types of Drinks", "Musical Groups", "Store Names", "Things at a Football Game", "Trees", "Personality Traits"]
    # @category_lists[:list_thirteen] = ["Video Games", "Electronic Gadgets", "Board Games", "Things that use a Remote", "Card Games", "Internet Lingo", "Offensive Words", "Wireless Thigns", "Computer Parts", "Software", "Websites", "Game Terms"]
    # @category_lists[:list_fourteen] = ["Things in a Grocery Store", "Reasons to quite your job", "Things that have stripes", "Tourist Attractions", "Diet Foods", "Things found in a hospital", "Food/Drink that is green", "Weekend Activities", "Acronyms", "Seafood", "Christmas Songs", "Words ending in -n"]
    # @category_lists[:list_fifteen] = ["Words with double letters", "Children's books", "Things found at a bar", "Sports played outdoors", "Names used in songs", "Foods you eat raw", "Places in Europe", "Olympic Events", "Things you see at the zoo", "Math Terms", "Animals in books or movies", "Things to do at a party"]
    # @category_lists[:list_sixteen] = ["Kinds of soup", "Things found in New York", "Things you get tickets for", "Things you do at work", "Foreign words used in English", "Thigns you shouldn't touch", "Spicy Foods", "Things at a Carnival", "Things You Make", "Places to Hangout", "Animal Noises", "Computer Programs"]
    # @category_lists[:list_seventeen] = ["Honeymoon spots", "Things you buy for kids", "Things that can kill you", "Reasons to take out a loan", "Words associated with winter", "Things to do on a date", "Historic Events", "Things you store items in", "Things you do everyday", "Things you get in the mail", "Things you save up to buy", "Things you sit/on"]
    # @category_lists[:list_eighteen] = ["Reasons to make a phone call", "Types of weather", "Titles people can have", "Things that have buttons", "Items you take on a road trip", "Things that have wheels", "Reasons to call 911", "Things that make you smile", "Ways to Kill TIme", "Things that can get you fired", "Hobbies", "Holiday Activities"]
    
    return @category_lists
  end

end