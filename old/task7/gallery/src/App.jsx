import { Carousel, ConfigProvider } from "antd";
import { useState, useEffect } from "react";
import './App.css'

function App() {
  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      setSlidesToShow(window.innerWidth < 768 ? 1 : 3);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const images = [
    { src: '/gal/public/a.jpg'},
    { src: '/gal/public/e.png'},
    { src: '/gal/public/i.jpg'},
    { src: '/gal/public/o.jpg'},
    { src: '/gal/public/p.jpg'},
    { src: '/gal/public/q.png'},
    { src: '/gal/public/r.png'},
    { src: '/gal/public/t.png'},
    { src: '/gal/public/u.jpg'},
    { src: '/gal/public/w.jpg'},
    { src: '/gal/public/y.jpg'},
  ];

  return (
    <>
    <ConfigProvider
      theme={{
        token: {
          colorText: "#FFFF",
        },

        components: {
          Carousel: {
            dotOffset: '-15vw',
          }
        }
      }}
    >
      <Carousel 
      arrows={true}
      infinite={true}
      dots={true}
      slidesToShow={slidesToShow}
      slidesToScroll={1}
      centerMode={true}
      centerPadding="0"
      focusOnSelect={true}>
          {images.map((image, index) => (
          <div key={index}>
          <img 
            src={image.src} 
            alt={image.alt}
            title={image.title}
          /></div>
          ))}
      </Carousel>
    </ConfigProvider>
    </>
  )
}

export default App
