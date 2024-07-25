import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import starRate from "../../utils/starRate";
import { Sparkles } from "lucide-react";
import { FaPersonWalking } from "react-icons/fa6";
import { IoIosTimer } from "react-icons/io";

import "./HostelDetail.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

const HostelDetail = () => {
  const Remarks = ["Fair", "Good", "Very good", "Excellent", "Superb"] as const;

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
    const swiperSlides = document.querySelectorAll(".swiper-slide");
    const swiper3DSlidePadding = document.querySelectorAll(".swiper-container");
    const swiperPagination = document.querySelector(
      "swiper-pagination-fraction, .swiper-pagination-custom, .swiper-horizontal > .swiper-pagination-bullets, .swiper-pagination-bullets.swiper-pagination-horizontal, .swiper-pagination"
    );
    const leftArrow = document.querySelector(".slider-controler .slider-arrow");
    const rightArrow = document.querySelector(
      ".slider-controler .swiper-button-next"
    );

    const handleOnload = () => {
      swiperSlides.forEach((slide) => {
        (slide as HTMLElement).style.width = "auto";
      });

      if (swiperPagination instanceof HTMLElement) {
        swiperPagination.style.setProperty("position", "relative");
      }

      swiper3DSlidePadding.forEach((slide) => {
        if (slide instanceof HTMLElement) {
          slide.style.setProperty("padding", "");
        }
      });
    };

    if (leftArrow instanceof HTMLElement && rightArrow instanceof HTMLElement) {
      leftArrow.style.setProperty("left", "40%");
      rightArrow.style.setProperty("right", "60%");
    }
    window.addEventListener("DOMContentLoaded", handleOnload);

    return () => window.removeEventListener("DOMContentLoaded", handleOnload);
  }, []);
  const hostelDetailData = useSelector(
    (state: RootState) => state.hostelsDetailData.hostelsDetailData
  );

  const handleMouseClick = () => {
    const rootUrl = `${window.location.protocol}//${window.location.host}`;
    window.location.href = `${rootUrl}/map/?lat=${hostelDetailData.lat}&lng=${hostelDetailData.lng}`;
  };

  const newArr = new Array<number>(5).fill(0);
  let total_ratings = 0;
  if (hostelDetailData.reviews_by_person) {
    hostelDetailData.reviews_by_person.forEach((rev) => {
      const num = rev.rating as number;
      total_ratings += num;
      if (Math.round(num) === 5) {
        newArr[4] += num;
      }
      if (Math.round(num) === 4) {
        newArr[3] += num;
      }
      if (Math.round(num) === 3) {
        newArr[2] += num;
      }
      if (Math.round(num) === 2) {
        newArr[1] += num;
      }
      if (Math.round(num) === 1) {
        newArr[0] += num;
      }
    });
  }

  return (
    <div className="hostel-detail--container">
      <div className="swiper-container">
        <h1 className="swiper-heading">{hostelDetailData.name}</h1>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="swiper_container"
        >
          {hostelDetailData.photos ? (
            hostelDetailData.photos.map((photoUrl, index) => (
              <SwiperSlide key={index}>
                <img src={photoUrl} alt={"slide_image " + index} />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <img src={hostelDetailData.icons} alt={"slide_image"} />
            </SwiperSlide>
          )}
          <div className="slider-controler">
            <div className="swiper-pagination"></div>
            <div className="swiper-button-prev slider-arrow">
              <ion-icon name="arrow-back-outline"></ion-icon>
            </div>
            <div className="swiper-button-next slider-arrow">
              <ion-icon name="arrow-forward-outline"></ion-icon>
            </div>
          </div>
        </Swiper>
      </div>
      <div className="hostelInfo-info--minimal-nav">
        <div className="hostel-ratings-reviews--minimal-nav">
          <p className="hostel-ratings--minimal-nav">
            {starRate({ rating: hostelDetailData.rating })}
          </p>
          <div className="ratingsReviews--minimal-nav">
            <div className="sparkleRating--minimal-nav">
              <Sparkles size={35} />
              <p style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                {hostelDetailData.rating
                  ? hostelDetailData.rating.toFixed(1)
                  : 1.0}
                /5
              </p>
            </div>
            <div className="remarkRate--minimal-nav">
              <p style={{ fontWeight: "bold" }}>
                {
                  remarks(
                    Math.round(
                      hostelDetailData.rating ? hostelDetailData.rating : 1
                    ) as number
                  ) as string
                }
              </p>
              <p>
                (
                {hostelDetailData.reviews
                  ? hostelDetailData.reviews.toLocaleString()
                  : 0}{" "}
                reviews)
              </p>
            </div>
          </div>
        </div>
        <p className="hostel-address--minimal-nav">
          <a href="/">
            {hostelDetailData.fulladdr +
              "-" +
              hostelDetailData.formatted_address}
          </a>
        </p>
        <div className="distace-duration--minimal-nav">
          <div className="distanceContainer">
            <FaPersonWalking size={30} />
            <p>Distance: {hostelDetailData.distance.text}</p>
          </div>
          <div className="durationContainer--minimal-nav">
            <IoIosTimer size={30} />
            <p>Duration: {hostelDetailData.duration.text}</p>
          </div>
        </div>
      </div>
      <div style={{ width: "60%" }}>
        <div className="showMap--minimal-nav">
          <button
            title="Show all available hostel on map"
            onClick={handleMouseClick}
            type="button"
          >
            Show on map
          </button>
        </div>
      </div>
      <div className="main--pipe-rating">
        <div className="pipe-rating">
          <div className="rating__average">
            <h1>{hostelDetailData.rating?.toFixed(1)}</h1>
            <p>{starRate({ rating: hostelDetailData.rating })}</p>
            <p>
              {hostelDetailData.user_ratings_total &&
                hostelDetailData.user_ratings_total.toLocaleString("en-US")}
            </p>
          </div>
          <div className="rating__progress">
            {hostelDetailData.user_ratings_total
              ? newArr.reverse().map((rating, index, arr) => (
                  <div className="rating_progress-value" key={index}>
                    <p>
                      {arr.length - index} <span className="star">&#9733;</span>
                    </p>
                    <div className="progress">
                      <div
                        className="bar"
                        style={{
                          width: `${
                            hostelDetailData?.user_ratings_total
                              ? (rating / total_ratings) * 100
                              : 0
                          }%`,
                        }}
                      ></div>
                    </div>
                    <p>
                      {hostelDetailData?.user_ratings_total &&
                        (
                          (rating / total_ratings) *
                          1 *
                          hostelDetailData?.user_ratings_total
                        ).toFixed(0)}
                    </p>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
      <div className="testimonials_minimal-nav">
        <div className="testimonial-heading_minimal-nav">
          <span>Comments</span>
          <h1>Client Says</h1>
        </div>
        <div className="testimonial-box-container">
          {hostelDetailData.reviews_by_person &&
            hostelDetailData.reviews_by_person
              .sort((a, b) => +b.time - +a.time)
              .map((user, index) => {
                const timestamp = user.time as number;
                const date = new Date(timestamp * 1000);
                return (
                  <div className="testimonial-box" key={index}>
                    <div className="box-top">
                      <div className="profile">
                        <div className="profile-img">
                          <img
                            src={user.profile_photo_url as string}
                            alt="hostel"
                          />
                        </div>
                        <div className="name-user">
                          <strong>{user.name}</strong>
                          <span>{user.relative_time_description}</span>
                        </div>
                      </div>
                      <div className="reviews">
                        <p>{starRate({ rating: user.rating as number })}</p>
                      </div>
                    </div>
                    <div className="client-comment">
                      <p>{user.text}</p>
                    </div>
                    <div className="comment-date">
                      <p>Date: {date.toUTCString()}</p>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>

      <div className="paystack-link">
        <hr />
        <p>
          <span>
            <em>Join a vibrant community!🌌</em>
          </span>
          <button
            type="button"
            onClick={() =>
              (window.location.href = `${process.env.REACT_APP_LOCAL_HOST_CLIENT}/payment`)
            }
          >
            Book your bed now
          </button>
        </p>
      </div>
    </div>
  );
};

export default HostelDetail;
