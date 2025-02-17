const userProductModel = require("../models/UserProduct");

const getAllUserProducts = async (req, res) => {
  try {
    const userProduct = await userProductModel.getAllUserProducts();
    res.status(200).json(userProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserProductDetail = async (req, res) => {
  const { productId } = req.params;
  try {
    const userProduct = await userProductModel.getUserProductDetail(productId);
    return res.status(200).json(userProduct[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getUserProductByIdUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const userProduct = await userProductModel.getUserProductByIdUser(userId);
    if (!userProduct) {
      return res.status(404).json({ error: "User product not found" });
    }
    return res.status(200).json(userProduct);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getUserProductSummaryByIdUser = async (req, res) => {
  const userId = Number(req.user.id);
  try {
    const userProduct = await userProductModel.getUserProductSummaryByIdUser(
      userId
    );
    if (!userProduct) {
      return res.status(404).json({ error: "User product not found" });
    }
    console.log("userProduct", userProduct);
    return res.status(200).json(userProduct);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createUserProduct = async (req, res) => {
  try {
    const data = {
      id_user: req.user.id,
      brand: req.body.brand,
      price: req.body.price,
      id_kurs: Number(req.body.id_kurs),
      stock: req.body.stock,
      volume: req.body.volume,
      id_satuan: Number(req.body.id_satuan),
      address: req.body.address,
      item_image: req.file.path,
      description: req.body.description,
      id_jenis_product: Number(req.body.id_jenis_product),
      id_provinsi: Number(req.body.id_provinsi),
      id_kota: Number(req.body.id_kota),
      company_category: req.body.company_category,
      storage_type: req.body.storage_type,
      packaging: req.body.packaging,
    };
    const newUserProduct = await userProductModel.createUserProduct(data);
    res.status(201).json(newUserProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUserProduct = async (req, res) => {
  const { id } = req.params;
  const data = {
    id_user: req.user.id,
    brand: req.body.brand,
    price: req.body.price,
    id_kurs: Number(req.body.id_kurs),
    stock: req.body.stock,
    volume: req.body.volume,
    id_satuan: Number(req.body.id_satuan),
    address: req.body.address,
    item_image: req.file ? req.file.path : null,
    description: req.body.description,
    id_jenis_product: Number(req.body.id_jenis_product),
    id_provinsi: Number(req.body.id_provinsi),
    id_kota: Number(req.body.id_kota),
    company_category: req.body.company_category,
    storage_type: req.body.storage_type,
    packaging: req.body.packaging,
  };

  try {
    const updatedUserProduct = await userProductModel.updateUserProduct(
      id,
      data
    );
    return res.status(200).json(updatedUserProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUserProduct = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    await userProductModel.deleteUserProduct(id);
    res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUserProducts,
  getUserProductDetail,
  getUserProductByIdUser,
  createUserProduct,
  updateUserProduct,
  deleteUserProduct,
  getUserProductSummaryByIdUser,
};
