import React from 'react';
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import 'swiper/swiper-bundle.min.css';
import './sidebarQuote.scss';

function SidebarQuote() {
    return (
        <section className="sidebar">
            <div className="sidebar__container">
                <div className="sidebar__quote">
                    <h3 className="sidebar__quote-title">Today Quotes</h3>
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                        slidesPerView={1}
                        className="sidebar__quote-list"
                        pagination={{ clickable: true }}
                        navigation
                        loop={true}
                        autoplay={{
                            delay: 6000,
                            pauseOnMouseEnter: true,
                            disableOnInteraction: false
                        }}
                    >
                        <SwiperSlide className="sidebar__quote-item">
                            <p className="sidebar__quote-content">The best preparation for tomorrow is doing your best today.</p>
                            <p className="sidebar__quote-author">H. Jackson Brown, Jr</p>
                        </SwiperSlide>
                        <SwiperSlide className="sidebar__quote-item">
                            <p className="sidebar__quote-content">Live so that when your children think of fairness, caring, and integrity, they think of you.</p>
                            <p className="sidebar__quote-author">H. Jackson Brown, Jr</p>
                        </SwiperSlide>
                        <SwiperSlide className="sidebar__quote-item">
                            <p className="sidebar__quote-content">Perfection is not attainable, but if we chase perfection we can catch excellence.</p>
                            <p className="sidebar__quote-author">Vince Lombardi</p>
                        </SwiperSlide>
                        <SwiperSlide className="sidebar__quote-item">
                            <p className="sidebar__quote-content">Keep your face always toward the sunshine - and shadows will fall behind you.</p>
                            <p className="sidebar__quote-author">Walt Whitman</p>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </section>
    )
}

export default SidebarQuote
