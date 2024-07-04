import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import "./Home.css";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { SideBar, DisplayHostels, ComprehensiveSearch } from "../../components";
import { IoCall } from "react-icons/io5";
import { MessageCircleMore } from "lucide-react";

import NavBar from "../../layouts/NavBar";
import useInViewport from "../../hooks/useInViewport";
import formattedDataForMap from "../../pages/MapWorks/hostelMap/data/hostelLocations";
import hostelDetailsJson from "../../pages/MapWorks/hostelMap/data/detailMapData.json";
import { HostelSearchInputContext } from "../../context/HostelSearchInputContext";
import useDebounced from "../../hooks/useDebounced";
import routeData from "../../pages/MapWorks/hostelMap/data/routeResponse.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isAuthenticated } from "../../services/api/authService";
import Footer from "../../components/Footer/Footer";
// import formattedDtata from "../MapWorks/hostelMap/data/hostelsDetailData";

type HostelDataType = {
  name: string;
  rating: number | undefined;
  user_ratings_total: number | undefined;
  icon: string | undefined;
  reviews_by_person:
    | Array<{
        author_name: string;
        profile_photo_url: string;
        text: string;
      }>
    | undefined;
};

type HostelDataTypeProp = HostelDataType[];

export interface ComprehensiveSearchprop {
  service_type: string;
  service_name: string;
  service_name_text: string;
}
const Home = () => {
  const formattedHostel: HostelDataTypeProp = hostelDetailsJson.map(
    ({ name, rating, user_ratings_total, icon, reviews_by_person }) => {
      return {
        name,
        rating,
        user_ratings_total,
        icon,
        reviews_by_person: reviews_by_person?.map(
          ({ author_name, profile_photo_url, text }) => ({
            author_name,
            profile_photo_url,
            text,
          })
        ),
      };
    }
  );

  const [auth, setAuth] = useState<boolean>(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const isInView = useInViewport(elementRef, { threshold: 0.0 });
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState<string>("");
  const [filteredHostel, setFilteredHostel] =
    useState<HostelDataTypeProp>(formattedHostel);

  const debouncedSearchValue = useDebounced(searchInput, 500);
  const [, setSearchParams] = useSearchParams();

  const Remarks = ["Fair", "Good", "Very good", "Excellent", "Superb"] as const;

  const location = useLocation();
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const [comprehensiveSearchArray, setComprehensiveSearchArray] = useState<
    Array<ComprehensiveSearchprop>
  >([]);
  const [comprehensiveSearchType, setComprehensiveSearchType] =
    useState<string>("");

  const [comprehensiveSearchBool, setComprehensiveSearchBool] =
    useState<boolean>(false);

  const comprehensiveSearchSearchNames: Array<string> = useMemo(() => [""], []);
  const [serviceName, setServiceName] = useState<string>("");

  const remarks = (index: number) => {
    switch (true) {
      case index <= 1 && index >= 0:
        return Remarks.at(1);
      case index <= 2 && index >= 1:
        return Remarks.at(2);
      case index <= 3 && index >= 2:
        return Remarks.at(3);
      case index <= 4 && index >= 3:
        return Remarks.at(4);
      case index <= 5 && index >= 4:
        return Remarks.at(5);
      default:
        return Remarks.at(1);
    }
  };
  useEffect(() => {
    isAuthenticated()
      .then((authenticated) => {
        setAuth(authenticated);
      })
      .catch((error) => console.error("Authentication check failed:", error));
  }, [auth]);

  const Filter = useCallback(
    (searchType: string, serviceName: string, serviceText: string) => {
      if (searchType === "top_picks") {
        const newData = formattedHostel.filter((hostel) => hostel);

        setFilteredHostel(newData);
        setServiceName(serviceName);
        navigate(
          `${location.pathname}?search_type=${searchType}&service_name=${serviceName}&service_name_text=${serviceText}`,
          { replace: true }
        );
      } else if (searchType === "boarding_apartment") {
        const newData = formattedHostel.filter((hostel) => {
          const tempHostel = formattedDataForMap.find(
            (property) =>
              property.name === hostel.name &&
              property.categories.some(
                (item) =>
                  item.toLowerCase().includes("boarding") ||
                  item.toLowerCase().includes("apartment")
              )
          );
          return hostel.name === (tempHostel?.name as string);
        });
        setFilteredHostel(newData);
        setServiceName(serviceName);
      } else if (searchType === "high_low") {
        const newData = formattedHostel.sort(
          (a, b) => (b?.rating as number) - (a?.rating as number)
        );
        setFilteredHostel(newData);
        setServiceName(serviceName);
      } else if (searchType === "low_high") {
        const newData = formattedHostel.sort(
          (a, b) => (a?.rating as number) - (b?.rating as number)
        );
        setFilteredHostel(newData);
        setServiceName(serviceName);
      } else if (searchType === "distance") {
        const sortedData = routeData.sort(
          (a, b) => a?.distance.value - b?.distance.value
        );

        const referenceMap = new Map(
          sortedData.map((route, index) => [route.name, index])
        );

        const newData = formattedHostel.sort((a, b): number => {
          if (referenceMap.has(a.name) && referenceMap.has(b.name)) {
            return (
              (referenceMap.get(a.name) as number) -
              (referenceMap.get(b.name) as number)
            );
          }

          if (referenceMap.has(a.name)) {
            return -1;
          }

          if (referenceMap.has(b.name)) {
            return 1;
          }

          return 0;
        });

        setFilteredHostel(newData);
        setServiceName(serviceName);
      } else if (searchType === "top_reviewed") {
        const newData = formattedHostel.sort(
          (a, b) =>
            (b?.user_ratings_total as number) -
            (a?.user_ratings_total as number)
        );
        setFilteredHostel(newData);
        setServiceName(serviceName);
      } else if (searchType === "service_hostel") {
        const newData = formattedHostel.filter((hostel) => hostel);
        setFilteredHostel(newData);
        setServiceName(serviceName);
      } else if (searchType === "service_boarding") {
        const newData = formattedHostel.filter((hostel) => {
          const tempHostel = formattedDataForMap.find(
            (property) =>
              property.name === hostel.name &&
              property.categories.some((item) =>
                item.toLowerCase().includes("boarding")
              )
          );
          return hostel.name === (tempHostel?.name as string);
        });
        setFilteredHostel(newData);
      } else if (searchType === "service_coffee") {
        const newData = formattedHostel.filter((hostel) => {
          const tempHostel = formattedDataForMap.find(
            (property) =>
              property.name === hostel.name &&
              property.categories.some((item) =>
                item.toLowerCase().includes("coffee")
              )
          );
          return hostel.name === (tempHostel?.name as string);
        });
        setFilteredHostel(newData);
        setServiceName(serviceName);
      } else if (searchType === "service_lunch_restaurant") {
        const newData = formattedHostel.filter((hostel) => {
          const tempHostel = formattedDataForMap.find(
            (property) =>
              property.name === hostel.name &&
              property.categories.some((item) =>
                item.toLowerCase().includes("lunch")
              )
          );
          return hostel.name === (tempHostel?.name as string);
        });
        setFilteredHostel(newData);
        setServiceName(serviceName);
      } else if (searchType === "service_restaurant") {
        const newData = formattedHostel.filter((hostel) => {
          const tempHostel = formattedDataForMap.find(
            (property) =>
              property.name === hostel.name &&
              property.categories.some((item) =>
                item.toLowerCase().includes("restaurant")
              )
          );
          return hostel.name === (tempHostel?.name as string);
        });
        setFilteredHostel(newData);
        setServiceName(serviceName);
      } else if (searchType === "service_souvenir") {
        const newData = formattedHostel.filter((hostel) => {
          const tempHostel = formattedDataForMap.find(
            (property) =>
              property.name === hostel.name &&
              property.categories.some((item) =>
                item.toLowerCase().includes("souvenir")
              )
          );
          return hostel.name === (tempHostel?.name as string);
        });
        setFilteredHostel(newData);
        setServiceName(serviceName);
      } else if (searchType === "service_wifi") {
        const newData = formattedHostel.filter((hostel) => {
          const tempHostel = formattedDataForMap.find(
            (property) =>
              property.name === hostel.name &&
              property.categories.some((item) =>
                item.toLowerCase().includes("wi-fi")
              )
          );
          return hostel.name === (tempHostel?.name as string);
        });
        setFilteredHostel(newData);
        setServiceName(serviceName);
      } else if (serviceName.includes("price")) {
        if (!auth) {
          setSearchParams(
            {
              search_type: "top_picks",
              service_name: "Our top picks",
            },
            { replace: true }
          );
          setServiceName("Our top picks");
          toast("🥹 You must Sign In or Register to show this feature", {
            type: "info",
            theme: "dark",
          });
          return;
        } else {
          toast(
            "🙆‍♀️ Oops! Sorry for the inconvenience. Prices of the hostel are not available on the website for now",
            { type: "info", theme: "dark" }
          );
          toast(
            "Press the Dial 📞 or the Telegram 💬 symbol to get in touch with the hostel managers",
            {
              type: "info",
              theme: "colored",
              delay: 6000,
            }
          );
          setSearchParams(
            {
              search_type: "top_picks",
              service_name: "Our top picks",
            },
            { replace: true }
          );
          setServiceName("Our top picks");
        }
      }
    },
    [formattedHostel, setSearchParams, auth, location, navigate]
  );

  useEffect(() => {
    const handleWindow = () => {
      if (
        (searchParams.get("search_type") === "location" ||
          searchParams.get("search_type") === "price" ||
          searchParams.get("search_type") === "distance_multi") &&
        comprehensiveSearchArray.length === 0
      ) {
        searchParams.set("service_type", "top_picks");
        searchParams.set("service_name", "Our top picks");
        searchParams.set("service_name_text", "");
        navigate(`${location.pathname}?${searchParams.toString()}`, {
          replace: true,
        });
      }

      const service_type = searchParams.get("search_type")
        ? searchParams.get("search_type")
        : "top_picks";
      const service_name = searchParams.get("service_name")
        ? searchParams.get("service_name")
        : "Our top picks";
      const service_name_text = searchParams.get("service_name_text")
        ? searchParams.get("service_name_text")
        : "";

      Filter(
        service_type as string,
        service_name as string,
        service_name_text as string
      );

      setServiceName(service_name as string);
    };

    window.addEventListener("load", handleWindow);

    return () => {
      window.removeEventListener("load", handleWindow);
    };
  }, [
    Filter,
    searchParams,
    serviceName,
    navigate,
    comprehensiveSearchArray,
    location,
  ]);

  useEffect(() => {
    if (!comprehensiveSearchBool || comprehensiveSearchArray.length === 0)
      return;

    if (comprehensiveSearchArray.length === 0) return;

    let newData = filteredHostel;

    if (
      comprehensiveSearchType === "sort" ||
      comprehensiveSearchType === "filter" ||
      comprehensiveSearchBool
    ) {
      const search_type = comprehensiveSearchArray.at(-1)?.service_type;
      const service_name = comprehensiveSearchArray.at(-1)?.service_name;
      const service_name_text =
        comprehensiveSearchArray.at(-1)?.service_name_text;

      setSearchParams(
        {
          search_type: search_type as string,
          service_name: service_name as string,
          service_name_text: service_name_text as string,
        },
        { replace: true }
      );
      setServiceName(service_name_text as string);

      comprehensiveSearchArray.map((search_type) => {
        comprehensiveSearchSearchNames.push(search_type.service_name_text);
        if (search_type.service_type === "location") {
          if (search_type.service_name === "RatingHigh") {
            newData = filteredHostel.sort(
              (a, b) => (b?.rating as number) - (a?.rating as number)
            );
          }

          if (search_type.service_name === "RatingLow") {
            newData = filteredHostel.sort(
              (a, b) => (a?.rating as number) - (b?.rating as number)
            );
          }

          if (search_type.service_name === "alphabeticalOrder") {
            newData = filteredHostel.sort((a, b) =>
              a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
            );
          }
        }

        if (search_type.service_type === "distance_multi") {
          newData = formattedHostel;
          const [start_distance_str, end_distance_str] =
            search_type.service_name_text.split("-");

          const start_distance = +start_distance_str.trim();
          const end_distance = +end_distance_str.trim();

          const filteredData = routeData.filter(
            (data) =>
              +data.distance.text.split("km")[0].trim() >= start_distance &&
              +data.distance.text.split("km")[0].trim() <= end_distance
          );

          const sortedData = filteredData.sort(
            (a, b) => a?.distance.value - b?.distance.value
          );

          const filteredDataFromNewData = newData.filter(
            (value) =>
              value.name ===
              sortedData.find((item) => item.name === value.name)?.name
          );

          const referenceMap = new Map(
            sortedData.map((route, index) => [route.name, index])
          );

          newData = filteredDataFromNewData.sort((a, b): number => {
            if (referenceMap.has(a.name) && referenceMap.has(b.name)) {
              return (
                (referenceMap.get(a.name) as number) -
                (referenceMap.get(b.name) as number)
              );
            }

            if (referenceMap.has(a.name)) {
              return -1;
            }

            if (referenceMap.has(b.name)) {
              return 1;
            }

            return 0;
          });
        }

        if (search_type.service_type === "room") {
          // setServiceName(search_type.service_name_text);
          return newData;
        }

        return null;
      });

      setFilteredHostel(newData);
      setComprehensiveSearchBool(false);
    }
  }, [
    comprehensiveSearchArray,
    comprehensiveSearchBool,
    filteredHostel,
    comprehensiveSearchType,
    comprehensiveSearchSearchNames,
    setSearchParams,
    formattedHostel,
  ]);

  const handlePaymentCash = (cash: string) => {
    toast(`${cash.toUpperCase()} as payment method noted successfully!`, {
      type: "success",
      theme: "dark",
    });
  };

  const handleCardMomo = (card_momo: string) => {
    toast(`${card_momo.toUpperCase()} as payment method noted successfully!`, {
      type: "success",
      theme: "dark",
    });
  };

  const handleComprehensiveSearch = (isClickedType: string) => {
    setComprehensiveSearchType(isClickedType);
    setComprehensiveSearchBool(true);
  };

  // useEffect(() => {
  //   const data = formattedDtata();
  //   console.log(data);
  // }, [formattedDtata]);

  return (
    <>
      <HostelSearchInputContext state={{ searchInput, setSearchInput }}>
        <main className="main-wrapper">
          <section className="left">
            <div className="site-icon--wrapper">
              <img
                src={require("../../assets/images/app-logo.jpg")}
                alt="app logo"
                height={50}
                width={50}
                style={{ borderRadius: "50%" }}
              />
              <p>Duplex</p>
            </div>
            <Link className="list-property--container" to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color="#000000"
                fill="none"
              >
                <path
                  d="M12 8V16M16 12L8 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              <p>List your property</p>
            </Link>
            <div className="side-bar-wrapper" ref={elementRef}>
              <SideBar
                Filter={Filter}
                handlePaymentCash={handlePaymentCash}
                handleCardMomo={handleCardMomo}
              />
              <div className="contacts-btns">
                <button title="Call available hostels managers">
                  <IoCall />
                </button>
                <button title="Real time chat with hostels managers">
                  <MessageCircleMore />
                </button>
              </div>
            </div>
            {!isInView && (
              <div className="side-bar-wrapper--sticky">
                <SideBar
                  Filter={Filter}
                  handlePaymentCash={handlePaymentCash}
                  handleCardMomo={handleCardMomo}
                />
                <div className="contacts-btns">
                  <button title="Call available hostels managers">
                    <IoCall />
                  </button>
                  <button title="Real time chat with hostels managers">
                    <MessageCircleMore />
                  </button>
                </div>
              </div>
            )}
          </section>
          <section className="right">
            <NavBar />
            <ToastContainer />

            <div className="hostel-name-count">
              <p>Duplex</p>
              <p>Filter By: {serviceName}</p>
              <p>{filteredHostel.length} properties</p>
            </div>

            <div className="display-wrapper">
              {filteredHostel
                .filter((item) => {
                  return debouncedSearchValue.toLowerCase() === ""
                    ? item
                    : item.name
                        .toLowerCase()
                        .includes(debouncedSearchValue.toLowerCase());
                })
                .map((hostel, index) => {
                  return (
                    <DisplayHostels
                      key={index}
                      imgUrl={
                        formattedDataForMap.find(
                          (item) => item.name === hostel.name
                        )?.thumbnail as string
                      }
                      name={hostel.name}
                      full_address={
                        formattedDataForMap.at(index)?.fulladdr as string
                      }
                      remark={
                        remarks(
                          Math.round(
                            hostel.rating ? hostel.rating : 1
                          ) as number
                        ) as string
                      }
                      reviews={hostel.user_ratings_total as number}
                      rate={hostel.rating as number}
                      icon={hostel.icon as string}
                      categories={
                        formattedDataForMap.find(
                          (item) => item.name === hostel.name
                        )?.categories
                          ? (formattedDataForMap.find(
                              (item) => item.name === hostel.name
                            )?.categories as string[])
                          : ["Hostel"]
                      }
                      user_review={{
                        author_name: hostel.reviews_by_person?.at(0)
                          ?.author_name as string,
                        profile_photo_url: hostel.reviews_by_person?.at(0)
                          ?.profile_photo_url as string,
                        text: hostel.reviews_by_person?.at(0)?.text as string,
                      }}
                      distance={
                        routeData
                          .filter((route) => route.name === hostel.name)
                          .at(0)?.distance.text as string
                      }
                      duration={
                        routeData
                          .filter((route) => route.name === hostel.name)
                          .at(0)?.duration.text as string
                      }
                      lat={
                        formattedDataForMap.find(
                          (item) => item.name === hostel.name
                        )?.lat
                          ? (formattedDataForMap
                              .find((item) => item.name === hostel.name)
                              ?.lat.toString() as string)
                          : ""
                      }
                      lng={
                        formattedDataForMap.find(
                          (item) => item.name === hostel.name
                        )?.lng
                          ? (formattedDataForMap
                              .find((item) => item.name === hostel.name)
                              ?.lng.toString() as string)
                          : ""
                      }
                    />
                  );
                })}
            </div>
            <ComprehensiveSearch
              Filter={Filter}
              handleComprehensiveSearch={handleComprehensiveSearch}
              setComprehensiveSearchArray={setComprehensiveSearchArray}
            />
          </section>
        </main>
      </HostelSearchInputContext>
      <Footer />
    </>
  );
};

export default Home;
