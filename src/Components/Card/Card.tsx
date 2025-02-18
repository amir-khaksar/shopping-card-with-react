import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { product } from "../Products.types";
import { useContext } from "react";
import { CartContext } from "../../context/cartContext";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

function Card({ id, title, image, price, rating }: product) {
  const context = useContext(CartContext);
  const navigate = useNavigate();

  const addToBasketHandler = () => {
    context.addProduct(id);
    swal({
      title: "محصول با موفقیت به سبد خرید اضافه شد",
      icon: "success",
      buttons: ["اوکی", "رفتن به سبد خرید"],
    }).then((result) => {
      if (result) {
        navigate("/cart");
      }
    });
  };

  return (
    <div className="card">
      <img src={image} />
      <main>
        <p>{title.slice(0, 13)} ...</p>
        <div className="card-details">
          <div>
            {Array(Math.ceil(rating.rate))
              .fill(0)
              .map(() => (
                <AiFillStar style={{ color: "orange" }} />
              ))}
            {Array(5 - Math.ceil(rating.rate))
              .fill(0)
              .map(() => (
                <AiOutlineStar style={{ color: "orange" }} />
              ))}
          </div>
          <p>{price}</p>
        </div>
        <button onClick={addToBasketHandler}>Add to Basket</button>
      </main>
    </div>
  );
}

export default Card;
