// import { saveAs } from "file-saver";
// import detailMapData from "./detailMapData.json";
// import gallery from "./Gallery.json";
// import formattedDataForMap from "./hostelLocations";
// import routeResponse from "./routeResponse.json";

// const formattedDtata = () => {
//   const formattedDtat = formattedDataForMap.map(
//     ({ name, fulladdr, categories }) => {
//       const dat = {
//         name,
//         fulladdr,
//         categories,
//       };

//       return dat;
//     }
//   );

//   const photos = gallery.map(({ photos, name }) => {
//     // console.log(photos);
//     return {
//       name,
//       photos,
//     };
//   });

//   const routes = routeResponse.map(({ name, distance, duration }) => {
//     return {
//       name,
//       distance,
//       duration,
//     };
//   });

//   const details = detailMapData.map(
//     ({
//       name,
//       geometry,
//       rating,
//       reviews,
//       user_ratings_total,
//       vicinity,
//       formatted_address,
//     }) => {
//       return {
//         geometry,
//         name,
//         rating,
//         reviews,
//         user_ratings_total,
//         vicinity,
//         formatted_address,
//       };
//     }
//   );

//   const combinedData = [
//     ...detailMapData,
//     ...formattedDataForMap,
//     ...gallery,
//     ...routeResponse,
//   ].reduce((acc, item) => {
//     if (item.name) {
//       if (!acc[item.name]) {
//         acc[item.name] = { name: item.name };
//       }
//       Object.assign(acc[item.name], item);
//     }
//     return acc;
//   }, {} as { [key: string]: any });

//   const resultArray = Object.values(combinedData);
//   //   console.log(resultArray);

//   //   const blob = new Blob([JSON.stringify(resultArray, null, 2)], {
//   //     type: "application/json",
//   //   });

//   //   saveAs(blob, "HostelsDetailData.json");
// };

// export default formattedDtata;

export {};
