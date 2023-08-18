import React, { useEffect, useState } from "react";
import { auth, googelProvider, db } from "./components/firebase-comfig";
import {
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getDoc,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  collection,
} from "firebase/firestore";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import Product from "./components/Product";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";
import { RiLogoutCircleRLine } from "react-icons/ri";

import avatarImage from "./images/avatar.png";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [products, setProducts] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [user, setUser] = useState(null);

  const productsCollectionRef = collection(db, "products");

  // firebase crud

  const singinWithGoogel = async () => {
    try {
      await signInWithPopup(auth, googelProvider);
      toast.success("you have signed in with googel");
      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      toast.success("you have signed out");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const singIn = async () => {
    if (email !== "" && password !== "") {
      try {
        // log in
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("you have signed in with email & password");
        //
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.warn("Please enter email or password");
    }
  };

  const createUser = async () => {
    if (email !== "" && password !== "") {
      try {
        // log in
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success("You signed up 🎉");
        //
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.warn("Please enter email or password");
    }
  };

  const addproduct = async () => {
    if (productName != "" && productPrice != "") {
      try {
        await addDoc(productsCollectionRef, {
          productName: productName,
          productPrice: productPrice,
          productImage: productImage,
          productDescription: productDescription,
          createdAt: Date.now(),
          uid: auth.currentUser.uid,
        });
        loadProduct();
        setProductName(" ");
        setProductPrice(" ");
        setProductImage(" ");
        setProductDescription(" ");
        toast.success(`${productName} was added 🎉`);
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const loadProduct = async () => {
    try {
      const data = await getDocs(productsCollectionRef);
      const filterData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProducts(filterData);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const DeleteProduct = async (id) => {
    const productDoc = doc(db, "products", id);
    await deleteDoc(productDoc);
    loadProduct();
    toast.success("Product was removed 😮‍💨");
  };

  useEffect(() => {
    loadProduct();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        setIsConnected(true);
      } else {
        setUser(null);
        setIsConnected(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // console.log(products);

  return (
    <>
      <Container style={{ marginTop: 15 }}>
        <ToastContainer />
        <Row>
          <Col lg={3}>
            {isConnected ? (
              <>
                <h4 style={{ marginLeft: "25%" }}>Connected as: </h4>
                <p style={{ fontSize: 20 }}>
                  Hi ✌🏻
                  <span style={{ fontSize: 22, color: "#3C896D" }}>
                    {/* displaying use name */}
                    {/* {user.displayName} */}
                    {user.email}
                  </span>
                </p>

                {/* display the profile picture of the user who has connected with Google, 
                if the user has connected with email and password is displayed, 
                a Default picture */}
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User Profile"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      marginLeft: "40%",
                      marginBottom: 20,
                    }}
                  />
                ) : (
                  <img
                    src={avatarImage}
                    alt="User Profile"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      marginLeft: "40%",
                      marginBottom: 20,
                    }}
                  />
                )}
                <Button
                  onClick={logOut}
                  className="btn btn-danger"
                  style={{ width: "100%", color: "#fff", fontSize: 18 }}
                >
                  Log Out
                  <RiLogoutCircleRLine
                    size={25}
                    color="#fff"
                    style={{
                      marginLeft: 15,
                    }}
                  />
                </Button>
              </>
            ) : (
              <>
                <h4>Connect with Google</h4>
                <p>Use your Google account to sign in</p>
                <br />
                <Button
                  onClick={singinWithGoogel}
                  className="btn btn-dark"
                  style={{
                    width: "100%",
                    color: "#fff",
                  }}
                >
                  Connect with Google
                  <FcGoogle
                    size={25}
                    style={{
                      marginLeft: 15,
                      backgroundColor: "#fff",
                      borderRadius: 5,
                    }}
                  />
                </Button>
                <br />
                <br />
                <br />
                <h4>Connect with email and password</h4>
                <br />
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      onChange={(text) => setEmail(text.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder=" Enter Password"
                      onChange={(text) => setPassword(text.target.value)}
                    />
                  </Form.Group>
                </Form>
                <Button
                  onClick={singIn}
                  className="btn btn-primary"
                  style={{
                    width: "48%",
                    color: "#fff",
                    marginBottom: 15,
                  }}
                >
                  Sign in
                </Button>
                <Button
                  onClick={createUser}
                  className="btn btn-success"
                  style={{
                    width: "48%",
                    color: "#fff",
                    marginBottom: 15,
                    marginLeft: 10,
                  }}
                >
                  Create User
                </Button>
              </>
            )}
          </Col>

          {/* felds */}
          <Col lg={9}>
            <Container style={{ marginTop: 15 }}>
              <Row>
                <Col lg={4}>
                  <input
                    type="text"
                    placeholder="Product Name"
                    onChange={(e) => setProductName(e.target.value)}
                    className="form-control"
                  />
                </Col>
                <Col lg={4}>
                  <input
                    type="text"
                    placeholder="Product Price"
                    onChange={(e) => setProductPrice(e.target.value)}
                    className="form-control"
                  />
                </Col>
                <Col lg={4}>
                  <input
                    type="text"
                    placeholder="Product Image"
                    onChange={(e) => setProductImage(e.target.value)}
                    className="form-control"
                  />
                </Col>
              </Row>
              <Row>
                <Col lg={9}>
                  <input
                    type="text"
                    placeholder="Description"
                    onChange={(e) => setProductDescription(e.target.value)}
                    className="form-control"
                    style={{ marginTop: 15 }}
                  />
                </Col>
                <Col lg={3}>
                  <Button
                    className="btn btn-light"
                    onClick={addproduct}
                    style={{
                      marginTop: 15,
                      width: "100%",
                      borderColor: "#000",
                    }}
                  >
                    Add Product
                  </Button>
                </Col>
              </Row>

              {/* content */}
              <Row style={{ marginTop: 40, marginRight: 20 }}>
                {products.map((item) => (
                  <Product
                    product={item}
                    deleteThisProduct={() => {
                      DeleteProduct(item.id);
                    }}
                  />
                ))}
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
