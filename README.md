# Reviewer
This app is developed using Cordova for Android with elegant UI design and animations.

This app allows the user to take a picture of anything and review it is a single page application.


### Home Page
The home page for the app is a list which will show either a message saying that there are no reviews or a list of titles.

The list of reviews is stored in localStorage as an Array of objects.

Clicking on any of the titles will take you to the details page and show the image, title, and rating for the reviewed item.

The home page has a FAB to add new reviews by taking the user to the Add Page.

### Details Page
The image of the item fills the whole width of the container.

The rating system is a star rating system displaying 1 to 5 stars.

There is a delete button which will remove the data from localstorage and return the user to the home page.

### Add Page
After the picture is taken and displayed then the input field for the title and input for the rating will appear.

After the picture is taken there will be a save and a cancel button. Both will take the user back to the home page. The save button will also update localStorage adding the new item.
