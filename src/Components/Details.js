import React, { Component } from "react";
import "../Styles/Details.css";
import Modal from "react-modal";
import querystring from "query-string";
import axios from "axios";
import Rating from "./Rating";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Loader from "./Loader";

export class Details extends Component {
  constructor() {
    super();

    this.state = {
      restaurant: [],
      tab: 1,
      modalIsOpen: false,
      menuItems: [],
      subtotal: 0,
      formModalIsOpen: false,
      imageModalIsOpen: false,
      name: undefined,
      email: undefined,
      contactNumber: undefined,
      address: undefined,
      loader: false,
    };
  }

  componentDidMount() {
    const qs = querystring.parse(this.props.location.search);
    const { restaurant } = qs;
    Modal.setAppElement(".details");
    this.setState({ loader: true });
    axios({
      method: "GET",
      url: `https://guarded-dusk-22777.herokuapp.com/restaurant/${restaurant}`,
      headers: { "Content-Type": "Application/json" },
    })
      .then((response) => {
        this.setState({
          restaurant: response.data.Restaurant,
          loader: false,
        });
      })
      .catch((err) => console.log(err));
  }
  handleCartModel = (state, value) => {
    this.setState({
      [state]: value,
    });
  };
  getMenuItems = () => {
    const { restaurant } = this.state;
    this.setState({ loader: true });
    axios({
      method: "GET",
      url: `https://guarded-dusk-22777.herokuapp.com/menuItems/${restaurant._id}`,
      headers: { "Content-Type": "Application/json" },
    })
      .then((response) => {
        this.setState({
          menuItems: response.data.MenuItems,
          loader: false,
        });
      })
      .catch((err) => console.log(err));
  };
  viewTab = (i) => {
    this.setState({
      tab: i,
    });
  };

  addItems = (index, operationType) => {
    let total = 0;

    const items = [...this.state.menuItems];
    const item = items[index];

    operationType === "increase" ? item.qty++ : item.qty--;

    items[index] = item;

    items.map((item) => (total += item.qty * item.price));
    this.setState({
      menuItems: items,
      subtotal: total,
    });
  };

  handleFormModel = (state, value) => {
    this.setState({
      [state]: value,
      modalIsOpen: false,
    });
  };

  handleInputChange = (state, event) => {
    this.setState({
      [state]: event.target.value,
    });
  };

  isDate = (val) => {
    // Cross realm comptatible
    return Object.prototype.toString.call(val) === "[object Date]";
  };

  isObj = (val) => {
    return typeof val === "object";
  };

  stringifyValue = (val) => {
    if (this.isObj(val) && !this.isDate(val)) {
      return JSON.stringify(val);
    } else {
      return val;
    }
  };

  buildForm = ({ action, params }) => {
    const form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", action);

    Object.keys(params).forEach((key) => {
      const input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", key);
      input.setAttribute("value", this.stringifyValue(params[key]));
      form.appendChild(input);
    });

    return form;
  };

  post = (details) => {
    const form = this.buildForm(details);
    document.body.appendChild(form);
    form.submit();
    form.remove();
  };

  getData = (data) => {
    return fetch(`https://guarded-dusk-22777.herokuapp.com/payment`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));
  };

  handlePayment = (e) => {
    let paymentObj = {};
    const { subtotal, email } = this.state;

    {
      !email
        ? alert("Please fill email")
        : (paymentObj = {
            amount: subtotal,
            email,
          });
      this.getData(paymentObj).then((response) => {
        var information = {
          action: "https://securegw-stage.paytm.in/order/process",
          params: response,
        };
        this.post(information);
      });
    }
    e.preventDefault();
  };

  render() {
    const {
      image,
      name,
      cuisine,
      aggregate_rating,
      rating_text,
      min_price,
      locality,
      city,
      contact_number,
      thumb,
    } = this.state.restaurant;
    const customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
      },
    };
    const {
      modalIsOpen,
      formModalIsOpen,
      imageModalIsOpen,
      menuItems,
      subtotal,
      loader,
    } = this.state;

    return (
      <div className="details">
        <div className="details__image">
          <img src={image} alt="" />
          <div className="details__imageButton">
            <button
              onClick={() => this.handleFormModel("imageModalIsOpen", true)}
            >
              Click to see Image Gallery
            </button>
          </div>
        </div>

        {loader ? (
          <Loader />
        ) : (
          <div className="details__infoContainer">
            <div className="details__info">
              <div className="details__infoLeft">
                <h1>{name}</h1>
                <br />
                <div className="details__infoLeftTabs">
                  <div
                    className={
                      this.state.tab !== 1 ? "overview" : "overview shadow"
                    }
                  >
                    <span onClick={() => this.viewTab(1)}>Overview</span>
                  </div>
                  <div
                    className={
                      this.state.tab !== 2 ? "overview" : "overview shadow"
                    }
                  >
                    <span className="contact" onClick={() => this.viewTab(2)}>
                      Contact
                    </span>
                  </div>
                  <div className="details__infoRight">
                    <button
                      onClick={() => {
                        this.handleCartModel("modalIsOpen", true);
                        this.getMenuItems();
                      }}
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div
              className="details__infoContent"
              hidden={true && this.state.tab !== 1}
            >
              <h4>About</h4>
              <div className="details__infoCuisine">
                <span>Cuisine : </span>

                {cuisine?.map((item, i) => {
                  return <small key={i}>{`${item.name}, `}</small>;
                })}
              </div>

              <div className="details__infoRating">
                <div style={{ marginRight: "10px" }}>
                  <span>Rating : </span>
                  <small className="rating-aggregate">{`(${aggregate_rating})`}</small>
                  <small className="rating-text">{`- ${rating_text}`}</small>
                </div>
                <Rating rating={aggregate_rating} />
              </div>

              <div className="details__infoCost">
                <span>Average Cost : </span>
                <small>&#8377; {min_price} for two people (Approx)</small>
              </div>
            </div>
            <div
              className="details__infoContent"
              hidden={true && this.state.tab !== 2}
            >
              <div>
                <span>Address : </span>
                <br />
                <small>{`${locality}, ${city}`}</small>
              </div>
              <br />
              <div>
                <span>Contact Number : </span>
                <br />
                <small>{contact_number}</small>
              </div>
            </div>
          </div>
        )}
        <div>
          <Modal isOpen={modalIsOpen} style={customStyles}>
            <div className="closebutton">
              <button
                onClick={() => this.handleCartModel("modalIsOpen", false)}
              >
                Close
              </button>
            </div>
            <div className="modalContent">
              <div className="cart-heading">
                <span>Subtotal : {subtotal}</span>
                {subtotal > 0 && (
                  <span
                    className="pay"
                    onClick={() =>
                      this.handleFormModel("formModalIsOpen", true)
                    }
                  >
                    Proceed
                  </span>
                )}
                <h5>Menu Items</h5>
              </div>
              {menuItems?.map((item, index) => {
                return (
                  <div key={item._id} className="menuItems">
                    <div className="menuItems-top">
                      <div className="menuItems__image">
                        <img src={item.image} alt="" />
                      </div>
                      <div className="menuItems__info">
                        <span>{menuItems.name}</span>
                        <p>{item.description}</p>
                      </div>
                    </div>
                    <div className="menuItems__details">
                      <small>
                        ingredients :{" "}
                        {item.ingridients.map((item, i) => {
                          return <span key={i}>{`${item}, `}</span>;
                        })}
                      </small>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <small>Qty : {item.qty}</small>
                        <small>Price : {item.price}</small>
                        {item.qty > 0 ? (
                          <div>
                            <button
                              className="qty-adjust"
                              onClick={() => this.addItems(index, "increase")}
                            >
                              +
                            </button>

                            <button
                              className="qty-adjust"
                              onClick={() => this.addItems(index, "decrease")}
                            >
                              -
                            </button>
                          </div>
                        ) : (
                          <button
                            className="add"
                            onClick={() => this.addItems(index, "increase")}
                          >
                            ADD
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Modal>

          <Modal isOpen={formModalIsOpen} style={customStyles}>
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputName">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputName"
                  placeholder="Enter name"
                  onChange={(event) => this.handleInputChange("name", event)}
                />
              </div>
              <br />
              <div className="form-group">
                <label htmlFor="exampleInputName">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputName"
                  placeholder="Enter email"
                  onChange={(event) => this.handleInputChange("email", event)}
                />
              </div>
              <br />
              <div className="form-group">
                <label htmlFor="exampleInputName">Contact Number</label>
                <input
                  type="number"
                  className="form-control"
                  id="exampleInputName"
                  placeholder="Enter Mobile number"
                  onChange={(event) =>
                    this.handleInputChange("contactNumber", event)
                  }
                />
              </div>
              <br />
              <div className="form-group">
                <label htmlFor="exampleInputName">Home Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputName"
                  placeholder="Enter Address"
                  onChange={(event) => this.handleInputChange("address", event)}
                />
                <small id="emailHelp" className="form-text text-muted"></small>
              </div>
              <br />
              <div className="button-flex">
                <button
                  type="submit"
                  className="pay"
                  style={{ marginRight: "5px" }}
                  onClick={(event) => this.handlePayment(event)}
                >
                  Checkout
                </button>
                <button
                  type="submit"
                  className="pay"
                  onClick={() => this.handleFormModel("formModalIsOpen", false)}
                >
                  close
                </button>
              </div>
            </form>
          </Modal>
          <Modal isOpen={imageModalIsOpen} style={customStyles}>
            <i
              className="fas fa-times-circle"
              style={{ marginLeft: "50%", fontSize: "30px", zIndex: "10" }}
              onClick={() => this.handleFormModel("imageModalIsOpen", false)}
            ></i>
            <Carousel>
              {thumb?.map((item, i) => {
                return (
                  <div key={i}>
                    <img src={`/${item}`} alt="" />
                  </div>
                );
              })}
            </Carousel>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Details;
