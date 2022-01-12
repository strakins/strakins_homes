import Link from "next/link"
import Image from "next/image"
import { Flex, Box, Text, Button } from "@chakra-ui/react"
import Property from '../component/property'
import { baseUrl, fetchApi } from '../utils/fetchApi'

const Banner = ( {purpose, imageUrl, title1, title2, desc1, desc2, buttonText, LinkName} ) => (
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10" >
    <Image src={imageUrl} width={500} height={300} alt="banner" />
    <Box p="5">
      <Text fontSize="sm" color="green" fontWeight="medium">{purpose}</Text>
      <Text fontSize="3xl" fontWeight="bold">{title1} <br /> {title2}</Text>
      <Text fontSize="lg" paddingTop="3" paddingBottom="4" fontWeight="gray.700">{desc1} <br /> {desc2} </Text>
      <Button fontSize="xl" >
       <Link href={LinkName}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
)

export default function Home({ propertiesForSale, propertiesForRent }) {

  console.log(propertiesForSale, propertiesForRent)

  return (

    <Box>
      <Text fontSize="3xl" fontWeight="bolder" fontStyle="italic" color="white" textAlign="center" bg="gray.500" p="6">Welcome to Strakins Homes</Text>
      <Banner 
        purpose="RENT A HOME"
        title1="Affordable Homes for"
        title2="Everyone"
        desc1="Explore Apartments, Villas, Homes"
        desc2="and more based on your pocket"
        buttonText="Explore Renting"
        LinkName="/search?purpose=for-rent"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"      
      />
      <Flex flexWrap="wrap" justifyContent="center">
        {/* Fetch rent properties and map over them*/}
        {propertiesForRent.map((property) => < Property property={property} key={property.id} />)}
      </Flex>
      < Banner 
        purpose="PURCHASE A HOME"
        title1="Find, Buy & Own"
        title2="Dream Home With Us!"
        desc1="Explore Apartments, Villas, Homes"
        desc2="and more"
        buttonText="Explore Buying"
        LinkName="/search?purpose=for-sale"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
      />
      <Flex flexWrap="wrap" justifyContent="center">
        {/* fetch buy properties and map over them */}
        {propertiesForSale.map((property) => < Property property={property} key={property.id}/>)}
      </Flex>
        
      
    </Box>
  )
}

export async function getStaticProps() {
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`);
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`)

  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    }
  }
}


