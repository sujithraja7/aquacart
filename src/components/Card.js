const Card = ({ imageSrc, productName, description, price }) => {
    return (
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img src={imageSrc} alt={productName} className="rounded-t-lg" />
        <div className="p-4">
          <h2 className="text-lg font-bold">{productName}</h2>
          <p>{description}</p>
          <p>Price: ₹{price.toFixed(2)}</p>
          <button className="bg-blue-500 text-white py-2 px-4 rounded">Add to Cart</button>
        </div>
      </div>
    );
  };
  
  export default Card;