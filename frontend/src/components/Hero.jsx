

function Hero() {
  return (
    <div>
        <section className="hero relative flex items-center justify-center bg-cover bg-center" >
            <div className="text-center z-10 relative">
                <h1 className="text-2xl md:text-4xl font-bold leading-tight">Where Flavor Meets Innovation</h1>
                <p className="text-lg md:text-xl text-gray my-4 mx-auto max-w-lg">Dive into a world of culinary delight with our recipe website. Explore a treasure trove of mouthwatering dishes, from quick   weekday meals to indulgent desserts. Discover new flavors, unleash your creativity, and embark on a delicious journey with us.
                </p>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Read More</button>
            </div>
        </section>
    </div>
  )
}

export default Hero