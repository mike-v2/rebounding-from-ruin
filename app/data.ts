const items = [
  {
    date: new Date('1929-10-24'),
    displayDate: "October 24, 1929",
    importance: 9,
    title: "Black Thursday",
    subtitle: "A record number of shares are traded on the New York Stock Exchange, setting off widespread panic among investors",
    text: `On October 24, 1929, a day that would come to be known as "Black Thursday," a record-breaking panic sell-off occurred at the New York Stock Exchange. As share prices collapsed, investors clamored to sell off their stocks in a frenzied attempt to cut their losses. Brokers and financiers made desperate attempts to stabilize the situation, but by the day's end, a new record of 12.9 million shares had been traded. This day marked the beginning of the stock market's catastrophic decline and set the stage for even darker days to follow.`
  },
  {
    date: new Date('1929-10-29'),
    displayDate: "October 29, 1929",
    importance: 10,
    title: "The Stock Market Collapses",
    subtitle: `The stock market crashes dramatically, marking the onset of the Great Depression. Billions are lost in a single day`,
    text: `Just five days after Black Thursday, on October 29, 1929, the stock market experienced an even more disastrous crash. Known as "Black Tuesday," this was the day when panic selling reached its zenith. Approximately 16 million shares were traded as the Dow Jones Industrial Average plummeted, wiping out a significant portion of investors' savings. The loss was unparalleled: billions of dollars vanished within hours. This precipitous decline signalled the beginning of the Great Depression, an economic downturn that would last a decade and reshape American society.`
  },
  {
    date: new Date('1930-06-01'),
    displayDate: "June, 1930",
    importance: 8,
    title: "First Bank Panics",
    subtitle: `Local and regional banks face the threat of insolvency due to bad loans and a run on their reserves`,
    text: `As a consequence of the stock market collapse, a lack of consumer confidence began to spread throughout the U.S. economy. By mid-1930, the fears had permeated the banking sector, leading to the first of several bank panics. These panics were characterized by mass withdrawals as customers sought to retrieve their deposits, fearing bank insolvencies. As banks saw their reserves dwindling, many indeed did close their doors, leading to significant financial losses for individuals and further eroding trust in the economic system. This domino effect underscored the interconnectedness of the U.S. economy and the vulnerabilities present within it.`
  },
  {
    date: new Date('1930-06-17'),
    displayDate: "June 17, 1930",
    importance: 7,
    title: "Smoot-Hawley Tariff",
    subtitle: `The Smoot-Hawley Tariff Act is passed, raising tariffs on imported goods and exacerbating the Depression's effects`,
    text: `With the goal of protecting American businesses and farmers by reducing foreign competition, Congress passed the Smoot-Hawley Tariff Act in 1930. This legislation dramatically raised tariffs on imported goods. However, instead of providing the intended economic relief, the tariff had the opposite effect. Foreign nations retaliated by imposing their own high tariffs on American goods, which dramatically decreased international trade. As a result, global economic conditions worsened, deepening the already severe economic depression. Economists widely regard the Smoot-Hawley Tariff as an ill-conceived policy that exacerbated the Great Depression.`
  },
  {
    date: new Date('1931-09-01'),
    displayDate: "September, 1931",
    importance: 6,
    title: "UK Leaves Gold Standard",
    subtitle: `The United Kingdom abandons the gold standard, causing financial reverberations globally`,
    text: `In September 1931, in a move that reverberated throughout the global financial community, the United Kingdom abandoned the gold standard. The gold standard was a system wherein the value of a country's currency was directly tied to a specific amount of gold. However, this system had become untenable for the UK, given the economic pressures of the time. By leaving the gold standard, the UK aimed to regain monetary independence, allowing for more flexibility in setting its economic policies. The departure had significant global implications, casting doubts on the sustainability of the gold standard and prompting other nations to reconsider their adherence to it.`
  },
  {
    date: new Date('1932-03-01'),
    displayDate: "March, 1932",
    importance: 7,
    title: "Ford Hunger March",
    subtitle: `Workers and activists march to demand better conditions, highlighting the desperate circumstances many face`,
    text: `In the midst of the Great Depression, workers faced severe unemployment and desperation. On March 7, 1932, in Detroit, thousands of unemployed workers marched to the Ford Motor Company's River Rouge plant to demand jobs and better working conditions. The march was organized by the Unemployed Councils, led primarily by the Communist Party. As the protesters approached the plant, they were met by the police and Ford's private security, resulting in violent confrontations. Multiple marchers were killed and many more injured. The Ford Hunger March became a symbol of the deep economic and social strife of the time, drawing national attention to the plight of workers.`
  },
  {
    date: new Date('1932-07-28'),
    displayDate: "July 28, 1932",
    importance: 8,
    title: "Bonus Army Dispersed",
    subtitle: `The Bonus Army, a group of World War I veterans seeking expedited benefits, is forcibly removed from Washington, D.C.`,
    text: `During the summer of 1932, in the nation's capital, around 20,000 World War I veterans and their families rallied and set up camps. These veterans, known as the Bonus Army, were demanding the immediate payment of a bonus that had been promised to them for their military service, but was scheduled to be paid in 1945. The situation escalated when, on July 28, the U.S. Army, led by Chief of Staff Douglas MacArthur, used force to disperse the demonstrators. Tanks, tear gas, and troops were deployed, resulting in the destruction of the veterans' campsites and leading to widespread criticism. The treatment of the Bonus Army is often cited as one of the reasons President Hoover lost the subsequent election to Franklin D. Roosevelt.`
  },
  {
    date: new Date('1933-03-04'),
    displayDate: "March 4-9, 1933",
    importance: 9,
    title: "FDR's Banking Measures",
    subtitle: `In response to widespread bank failures, FDR declares a 'bank holiday' and signs the Emergency Banking Act to stabilize the financial system`,
    text: `Soon after his inauguration in March 1933, Franklin D. Roosevelt faced a major banking crisis. Banks across the country were closing, and public confidence in the banking system was plummeting. In response, FDR declared a "bank holiday," temporarily halting all banking operations. This gave Congress the time to draft and pass the Emergency Banking Act, which aimed to stabilize the banking sector. When the banks reopened, FDR took to the radio for his first "fireside chat," reassuring the American public of the banking system's soundness. His measures and communication effectively restored public confidence, stopping massive bank runs and further financial collapse.`
  },
  {
    date: new Date('1933-12-05'),
    displayDate: "December 5, 1933",
    importance: 5,
    title: "End of Prohibition",
    subtitle: `The ratification of the 21st Amendment marks the end of Prohibition, potentially stimulating economic growth through the legal alcohol trade`,
    text: `The Prohibition era in the U.S., spanning from 1920 to 1933, was marked by the 18th Amendment which prohibited the manufacture, sale, and transportation of alcoholic beverages. Despite its intentions, the Prohibition led to a rise in organized crime, underground speakeasies, and illegal bootlegging operations. Recognizing the failures of Prohibition and in part to stimulate economic recovery, Congress proposed the 21st Amendment to repeal the 18th. Ratified on December 5, 1933, the 21st Amendment ended Prohibition, marking a significant shift in American policy and culture.`
  },
  {
    date: new Date('1934-01-01'),
    displayDate: "1934",
    importance: 8,
    title: "SEC Established",
    subtitle: `The Securities Exchange Act establishes the Securities and Exchange Commission (SEC) to oversee stock trading and prevent abuses`,
    text: `The stock market crash of 1929 exposed significant flaws and malpractices within the U.S. financial system. In response, the U.S. Congress passed the Securities Act of 1933 and the Securities Exchange Act of 1934. The latter led to the creation of the Securities and Exchange Commission (SEC) in 1934. The SEC's primary mission was, and still is, to enforce federal securities laws and regulate the securities industry, the nation's stock and options exchanges. It aimed to restore investor confidence by ensuring that securities markets operated fairly and transparently, free from fraudulent practices. Over the years, the SEC has played a crucial role in shaping the U.S. financial landscape by implementing various rules and regulations to protect investors.`
  },
  {
    date: new Date('1935-08-14'),
    displayDate: "August 14, 1935",
    importance: 9,
    title: "Social Security Enacted",
    subtitle: `The Social Security Act is signed, providing unemployment insurance and pensions for elderly citizens`,
    text: `The Social Security Act was a cornerstone of President Franklin D. Roosevelt's New Deal program, representing one of the most significant social welfare measures ever passed in the United States. Its primary goal was to alleviate the hardships faced by elderly Americans during the Great Depression. The act established two main programs: a federal-state program of unemployment compensation and a federal program of old-age retirement insurance. Moreover, the legislation also introduced programs for dependent children, the blind, and other vulnerable populations. The Social Security system is financed through payroll taxes levied on employers, employees, and the self-employed. This act marked the U.S. government's commitment to the welfare of its citizens and has since evolved and expanded but remains a fundamental part of the U.S. social safety net.`
  },
  {
    date: new Date('1937-01-01'),
    displayDate: "1937",
    importance: 7,
    title: "Economic Downturn",
    subtitle: `The U.S. economy faces a downturn, sometimes attributed to certain New Deal policies and is often termed the 'Roosevelt Recession`,
    text: `Just when the U.S. was starting to recover from the depths of the Great Depression, the economy took another severe downturn in 1937, often referred to as the "Roosevelt Recession." This economic backslide was largely attributed to a combination of factors: the reduction in New Deal spending, stricter banking regulations, and the expiration of previous monetary policies. There was also a decrease in business inventories and a fall in private investments. By 1938, unemployment spiked once again, erasing most of the employment progress made since 1933. In response, President Roosevelt launched a new round of public works programs, and by 1939, recovery was once again underway.`
  },
  {
    date: new Date('1939-01-01'),
    displayDate: "1939",
    importance: 8,
    title: "Recovery Begins",
    subtitle: `As World War II looms, increased production aids the U.S. in emerging from the depths of the Great Depression`,
    text: `While many New Deal programs helped stabilize the U.S. economy during the 1930s, it was the onset of World War II that played a decisive role in ending the Great Depression. By 1939, European nations, already embroiled in conflict, looked to the U.S. for supplies, from food to weapons. The U.S. shifted from a peacetime economy to a wartime economy, with industries rapidly converting to war production. This shift created millions of jobs, effectively reducing unemployment and leading to a surge in economic activity. Although the U.S. did not enter the war until 1941, the mobilization for global conflict played a crucial role in bringing the nation out of the decade-long economic slump.`
  },
  {
    date: new Date('1941-01-01'),
    displayDate: "1941",
    importance: 10,
    title: "U.S. Enters WWII",
    subtitle: `The attack on Pearl Harbor propels the U.S. into World War II, and war production essentially brings an end to the Great Depression in the U.S.`,
    text: `On December 7, 1941, the U.S. naval base at Pearl Harbor in Hawaii was unexpectedly attacked by the Japanese military. This surprise attack resulted in the deaths of over 2,400 Americans and significant damage to the Pacific Fleet. The very next day, President Franklin D. Roosevelt, describing December 7 as "a date which will live in infamy," asked Congress to declare war on Japan. The declaration was almost unanimous, with only one dissenting vote. This event formally thrust the U.S. into World War II, aligning with the Allies – primarily Britain, the Soviet Union, and China – against the Axis Powers, which included Germany, Japan, and Italy. The war effort led to significant industrial mobilization and economic growth, effectively marking the end of the Great Depression in the U.S.`
  },
  {
    date: new Date('1928-10-25'),
    displayDate: "October 25, 1928",
    importance: 7,
    title: "Stock Market Peak",
    subtitle: `The Dow Jones Industrial Average reaches an all-time high, fueling optimism and speculative investments`,
    text: `By 1928, the Roaring Twenties had led to unprecedented economic growth and prosperity in the United States. The stock market, in particular, saw a massive surge. Speculation ran rampant, with investors borrowing heavily to buy more stock. However, this exuberance blinded many to underlying economic weaknesses and disparities, setting the stage for the impending crash.`
  },
  {
    date: new Date('1930-12-11'),
    displayDate: "December 11, 1930",
    importance: 9,
    title: "First Wave of Bank Failures",
    subtitle: `Over 1,300 banks suspend operations, double the 1929 rate, shaking the public's confidence in the banking system`,
    text: `The early 1930s marked a dire time for the U.S. banking system. As the repercussions of the stock market crash permeated the economy, many banks, particularly those that had invested heavily in the stock market or extended credit to stock purchasers, found themselves in peril. With no federal insurance for bank deposits at the time, public panic resulted in mass withdrawals, further destabilizing the system.`
  },
  {
    date: new Date('1931-01-01'),
    displayDate: "1931",
    importance: 8,
    title: "Hoovervilles Emerge",
    subtitle: `Named sarcastically after President Herbert Hoover, these makeshift shantytowns house many who are unemployed and homeless`,
    text: `As the Depression deepened and unemployment soared, many found themselves without homes. Hoovervilles, named after President Hoover whom many blamed for not doing enough to combat the Depression, sprang up across the nation. These makeshift shantytowns were constructed of discarded materials and represented the widespread despair and poverty of the time. They became poignant symbols of the economic tragedy and governmental inaction.`
  },
  {
    date: new Date('1933-04-05'),
    displayDate: "April 5, 1933",
    importance: 9,
    title: "Civilian Conservation Corps (CCC) Created",
    subtitle: `As a part of FDR's New Deal, the CCC provided jobs for millions in natural resource conservation`,
    text: `The Civilian Conservation Corps was one of the earliest New Deal programs aimed at providing immediate relief for the unemployed during the Great Depression. It employed young, unmarried men in reforestation, park maintenance, and erosion control projects. Participants lived in CCC camps, received food, clothing, and a small wage, a portion of which was sent directly to their families. Over its existence, the CCC planted billions of trees, paved thousands of miles of roads, and played a significant role in the development and enhancement of national parks.`
  },
  {
    date: new Date('1933-06-16'),
    displayDate: "June 16, 1933",
    importance: 10,
    title: "Glass-Steagall Banking Act",
    subtitle: `The Act established the Federal Deposit Insurance Corporation (FDIC) and imposed banking reforms, separating investment and commercial banking`,
    text: `The Glass-Steagall Act was a response to the bank failures of the early 1930s. It was designed to restore trust in the American banking system. By separating commercial and investment banking activities, it aimed to minimize the risks posed by speculative trading. The creation of the FDIC ensured bank deposits, further increasing the public's trust in banks. The law had a lasting impact until many of its key provisions were repealed in the late 20th century.`
  },
  {
    date: new Date('1934-06-18'),
    displayDate: "June 18, 1934",
    importance: 7,
    title: "Indian Reorganization Act",
    subtitle: `A New Deal initiative aimed at decreasing federal control over American Indian affairs and increasing Indian self-government and responsibility`,
    text: `Also known as the "Indian New Deal", the Indian Reorganization Act marked a shift in U.S. Indian policy away from forced assimilation and towards allowing greater Indian cultural and governmental autonomy. The act aimed to restore Indian management of resources, reduce the power of boarding schools, and promote tribal self-governance. However, not all tribes agreed with its provisions, and some chose not to adopt it.`
  },
  {
    date: new Date('1935-07-05'),
    displayDate: "July 5, 1935",
    importance: 9,
    title: "Wagner Act",
    subtitle: `The Wagner Act protects workers' rights`,
    text: `Officially known as the National Labor Relations Act, the Wagner Act was a major labor law reform enacted in the United States to protect the rights of workers to organize, engage in collective bargaining, and participate in strikes. The act also established the National Labor Relations Board (NLRB) to oversee and enforce its provisions.`
  },
  {
    date: new Date('1936-01-06'),
    displayDate: "January 6, 1936",
    importance: 8,
    title: "U.S. v. Butler Supreme Court Case",
    subtitle: `A setback for New Deal agricultural reforms`,
    text: `In U.S. v. Butler, the Supreme Court ruled the Agricultural Adjustment Act (AAA) of 1933 unconstitutional. The AAA was designed to boost agricultural prices by providing subsidies to farmers who reduced crop production. The decision was a blow to Roosevelt's New Deal but led to the development of new ways to support American farmers.`
  },
  {
    date: new Date('1939-12-15'),
    displayDate: "December 15, 1939",
    importance: 7,
    title: "Hollywood's Golden Year",
    subtitle: `The film industry shines amidst the gloom`,
    text: `1939 is often referred to as the "Golden Year of Hollywood" because of the release of numerous iconic films. The most notable of these was "Gone with the Wind," which premiered on December 15 and went on to win multiple Oscars, including Best Picture. Other major films from that year include "The Wizard of Oz," "Mr. Smith Goes to Washington," and "Stagecoach."`
  },
  {
    date: new Date('1941-01-01'),
    displayDate: "November 5, 1940",
    importance: 10,
    title: "FDR's Third Term",
    subtitle: `Roosevelt breaks with tradition`,
    text: `Franklin D. Roosevelt's election to a third term as president was unprecedented. Before him, no president had served more than two terms, adhering to a tradition set by George Washington. Roosevelt's third term win was a testament to the trust the American people placed in his leadership as World War II loomed.`
  },
];

export default items;
