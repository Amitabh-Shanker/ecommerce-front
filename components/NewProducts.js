import styled from "styled-components";
import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductsGrid";

const Bg = styled.div`
  background-color: #f5f5f5; // light gray for contrast, adjust as needed
  padding: 100px ;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin: 0 0 40px; // was 20px
  font-weight: 500;
`;

export default function NewProducts({ products }) {
  return (
    <Bg>
      <Center>
        <Title>New Arrivals</Title>
        <ProductsGrid products={products} />
      </Center>
    </Bg>
  );
}
