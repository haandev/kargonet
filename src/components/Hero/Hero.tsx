import React from "react"

const Hero = () => {
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto flex flex-col items-center py-12 sm:py-24">
        <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col  mb-5 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-amber-400 font-black leading-7 md:leading-10">
            <span className="text-earth-700"> kargonet </span>
            ile tanışmaya hazır mısın?
          </h1>
          <p className="mt-5 sm:mt-10 lg:w-10/12 text-gray-400 font-normal text-center text-sm sm:text-lg">
            nakliyenin zahmetsiz ve yeni hali kargonet ile tanışmaya hazır
            mısın? nakliye fiyatı almak hiç bu kadar kolay olmamıştı. yükleme ve
            boşaltma konumlarını gir, takvimden bir tarih belirle, anında fiyat
            al
          </p>
        </div>
        <div className="flex justify-center items-center">
          <button
            onClick={() => {
              const scrollStart =
                document.getElementById("scroll-start")?.offsetTop
              window.scrollTo({ top: scrollStart })
            }}
            className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400 bg-amber-400 transition duration-150 ease-in-out hover:bg-amber-300 lg:text-xl lg:font-bold  rounded text-earth-900 px-4 sm:px-10 border border-amber-400 py-2 sm:py-4 text-sm">
            Anında fiyat al
          </button>
          <button className="ml-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400 bg-transparent transition duration-150 ease-in-out hover:border-amber-300 lg:text-xl lg:font-bold  hover:text-amber-300 rounded border border-amber-400 text-amber-400 px-4 sm:px-10 py-2 sm:py-4 text-sm">
            Kampanyalar
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero
