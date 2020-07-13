# EFood

This project works with backend code available as [e-food-server](https://github.com/shashankvivek/e-food-server). The code is written in `Angular`.

Steps:

1. Install [NodeJS](https://nodejs.org/en/download/)
2. Install dependencies using `npm i` command
3. This code is written in **Angular 8**. Please install angular-cli (Angular CLI: 8.3.23) globally. 
> npm install -g @angular/cli@8.3.23

4. The [proxy.conf.json](https://github.com/shashankvivek/e-food-client/blob/master/e-food/proxy.conf.json) is used to proxy the server from `8080` port to `4200` port.  Please make sure that server runs on `8080` port to support all features and cookies.
5. To start the project locally, use below command:

    > npm start

    OR

    > ng serve --proxy-config proxy.conf.json

6. Unit tests are missing as of now. I have written series of helpful articles on unit testing over [medium.com](https://medium.com/@shashankvivek.7/say-hi-to-jasmine-karma-in-angular-intro-d728d669a1c7) which received 6000+ views every month. These articles can be referred to write test cases

This demo project includes:

1. Guest cart session. (After closing the browser, the app maintain the list of products for guest user)
2. User Registration 
3. User Login using `JWT` with validity set to 300 mins
4. Cart Rules:
      - If 7 or more apples are added to the cart, a 10% discount is applied to all apples
      -  For each set of 4 pears and 2 bananas, a 30% discount is applied, to each set.
      -  These sets must be added to their own cart item entry.
      -  If pears or bananas already exist in the cart, this discount must be recalculated when new pears or bananas are added
5. Coupons can be generated using [e-food-server](https://github.com/shashankvivek/e-food-server). To generate a coupon, make a `POST` call to below endpoint:
     > http://127.0.0.1:8080/v1/generateCouponCode
      - coupon code can be used to get a 30% discount on oranges, if applied to the cart, otherwise oranges are full price
      - the `/generateCouponCode` can easily be configured to generate different coupons with different product rules
      - a coupon can only be applied once (this is also configurable in `/generateCouponCode` which accepts `userLimit` to restrict the number of times a coupon can be consumed)          
      - Has a configurable expiry timeout (10 seconds has been hard-coded in API for testing purposes) once generated.
6. Checkout cart shows:
      - Total price
      - Total Saving
7. In a cart you can :
      - Adjust quantity.
      - Delete items from the cart.
      - Apply coupons. ( option available during checkout time only )
8. A test payment gateway has been provided to complete the journey. ( **https://razorpay.com/**)
9.  Architecture diagram can be found at `./resources/e-food.drawio` and can be opened using http://draw.io/
10. Order Management, Inventory management & User address have not been implemented yet.  
     
---------------------
**Note**: Other areas of improvement has been noted down into `to-do.txt` file of this repo
 

