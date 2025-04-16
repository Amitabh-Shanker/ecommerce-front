import styled from "styled-components";
import Link from "next/link";
import { primary } from "@/lib/colors";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext"; // ✅ Import CartContext

const ProductWrapper = styled.div`
  width: 100%;
`;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  img {
    max-width: 100%;
    max-height: 120px;
  }
`;

const Title = styled(Link)`
  font-weight: 500;
  font-size: 0.9rem;
  color: #333;
  text-decoration: none;
  display: block;
  margin: 5px 0;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 3px;
`;

const Price = styled.div`
  font-weight: bold;
  font-size: 1rem;
`;

const AddToCartButton = styled.button`
  background-color: transparent;
  color: ${primary};
  border: 1px solid ${primary};
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${primary};
    color: white;
  }
`;

export default function ProductBox({ _id, title, description, price, images }) {
  const url = "/product/" + _id;
  const { addProduct } = useContext(CartContext); // ✅ Use the context

  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <img src={images?.[0]} alt={title} />
      </WhiteBox>
      <div>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>${price}</Price>
          <AddToCartButton onClick={() => addProduct(_id)}>
            Add to cart
          </AddToCartButton>
        </PriceRow>
      </div>
    </ProductWrapper>
  );
}
