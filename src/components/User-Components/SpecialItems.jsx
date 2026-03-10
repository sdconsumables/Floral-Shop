export default function SpecialItems() {

  const specialItems = [
    {
      name: "Wedding Garland",
      image: "/special/garland1.jpg",
    },
    {
      name: "Temple Garland",
      image: "/special/garland2.jpg",
    },
    {
      name: "Flower Bouquet",
      image: "/special/bouquet.jpg",
    },
  ];

  return (
    <section>

      <h1 className="text-3xl font-bold text-center mb-10">
        Special Collections
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {specialItems.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-64 w-full object-cover"
            />

            <div className="p-4 text-center">
              <h2 className="text-xl font-semibold">
                {item.name}
              </h2>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}