import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyDnDz_j1laOhcP2B3H5mJd3eASh-23Mfrw");
Geocode.setLanguage("en");
// Geocode.
Geocode.setRegion("GR");
Geocode.enableDebug();

export async function getAddress(lat: string, lng: string) {
  // Geocode.fromLatLng("31.4946678", "74.391252").then(

    Geocode.fromLatLng(lat, lng).then(
      (response) => {
        const address = response.results[0];
        console.log({address});
      },
      (error) => {
        console.error(error);
      }
    );

  // Geocode.fromLatLng(lat, lng).then(
  //   (response) => {
  //     const address = response.results[0].formatted_address;
  //     let city, state, country, postalCode;
  //     for (let i = 0; i < response.results[0].address_components.length; i++) {
  //       for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
  //         switch (response.results[0].address_components[i].types[j]) {
  //           case "locality":
  //             city = response.results[0].address_components[i].long_name;
  //             break;
  //           case ("administrative_area_level_1"):
  //           case ("administrative_area_level_3"):
  //             state = response.results[0].address_components[i].long_name;
  //             break;
  //           case "country":
  //             country = response.results[0].address_components[i].long_name;
  //             break;
  //           case "postal_code":
  //             postalCode = response.results[0].address_components[i].long_name
  //             break;
  //         }
  //       }
  //     }
  //     console.log({city, state, country, postalCode});
  //     console.log({address});
  //     return { city, state, country, postalCode };
  //   },
  //   (error) => {
  //     console.error(error);
  //   }
  // );

  try {
    const response = await Geocode.fromLatLng(lat, lng);
    const address = response?.results[0]?.formatted_address;
    let city, state, country, postalCode;

    for (let i = 0; i < response.results[0].address_components.length; i++) {
      for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
        switch (response.results[0].address_components[i].types[j]) {
          case "locality":
            city = response.results[0].address_components[i].long_name;
            break;
          case ("administrative_area_level_1"):
          case ("administrative_area_level_3"):
            state = response.results[0].address_components[i].long_name;
            break;
          case "country":
            country = response.results[0].address_components[i].long_name;
            break;
          case "postal_code":
            postalCode = response.results[0].address_components[i].long_name
            break;
        }
      }
    }

    console.log({ city, state, country, postalCode });
    return { city, state, country, postalCode }
  } catch (error) {
    console.log('/lib/react-geocode :: ', { error })
    return { error: "Something went wrong! / react-geacode: " }
  }
}