import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardsEdite } from "../Cards/CardsEdit.jsx";
import { asyncAllProducts } from "../redux/slice.jsx";
import ModalGen from "../Modal/ModalConfirmacion/Modal.jsx";
import AddProduct from "../Comander/formVenta/formAddProd.jsx";

export const Editer = () => {
  const dispatch = useDispatch();
  const { allProduct } = useSelector((state) => state.alldata);

  useEffect(() => {
    dispatch(asyncAllProducts());
  }, []);

  // Estado para el valor de búsqueda
  const [searchValue, setSearchValue] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Efecto secundario para actualizar filteredProducts cuando allProduct cambie
  useEffect(() => {
    setFilteredProducts(allProduct);
  }, []);

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setSearchValue(value);

    // Si el valor de búsqueda está vacío, enviar directamente allProduct
    if (value === "") {
      setFilteredProducts(allProduct);
    } else {
      // Filtrar los productos basados en el valor de búsqueda
      const filtered = allProduct.filter(product =>
        product?.attributes?.name?.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="containerEdit">
        <div className="searchBar">
        <label htmlFor="">Buscar</label>
        <input
          type="search"
          name=""
          id=""
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="Buscar producto..."
        />
        </div>
      <div>
        <h2 style={{paddingTop:"2.5rem"}}>Edicion de productos</h2>
        <ModalGen Child={<AddProduct />} txtBtn="+ Producto" />
        <CardsEdite products={filteredProducts} />
      </div>
    </div>
  );
};
