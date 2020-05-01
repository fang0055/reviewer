# Reviewer
This app is developed using Cordova for Android with elegant UI design and animations.

This app allows the user to take a picture of anything and review it is a single page application.


### Home Page
1. The home page for the app is a list which will show either a message saying that there are no reviews or a list of titles.
2. The list of reviews is stored in localStorage as an Array of objects.
3. Clicking on any of the titles will take you to the details page and show the image, title, and rating for the reviewed item.
4. The home page has a FAB to add new reviews by taking the user to the Add Page.

### Details Page
1. The image of the item fills the whole width of the container.
2. The rating system is a star rating system displaying 1 to 5 stars.
3. There is a delete button which will remove the data from localstorage and return the user to the home page.
### Add Page
1. After the picture is taken and displayed then the input field for the title and input for the rating will appear.
2. After the picture is taken there will be a save and a cancel button. Both will take the user back to the home page. The save button will also update localStorage adding the new item.
