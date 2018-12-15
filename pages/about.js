import Layout from '../components/MyLayout.js'

export default () => (
    <Layout>
       <h1> About </h1>
       <p>
        Implement a “New York Times” Web application using their API
        Story: As a user, I would like to search for the interested articles from New York Times.
        Requirements: Create the “New York Times” web application that has a home-page
        and detail-page with these details
        </p>
        <h2>Home-page:</h2>
        <p>
        - This page by default should display all articles without any search filter applied.<br/>
        - Has a search input (without submit button) that allows a user to search articles by a
        search string.<br/>
        - Automatically update the list given this search results without reloading the page.<br/>
        - Has an option to order the search results by newest first or oldest first.<br/>
        - It should display a detail-page when select on each single result article.<br/>
        </p>
        
        <h2>Detail-page:</h2> 
        - Show the article detail.<br/>
        - Able to navigate back to the home-page.<br/>
        There's no need to consider unit tests for this exercise.

        <h2>Acceptance Criterias</h2> 
        <p>
        - One of either React or Angular 5+ JavaScript frameworks should be used.<br/>
        - The application should be responsive, it should display correctly either on
        desktop or mobile.<br/>
        - There should be a Readme file containing instructions on how to compile/start the
        application.<br/>
        - The application should work fine on the latest version of Google Chrome.<br/>
        - The application should be bug free.<br/>
        - You are required to submit your documented source code to GIT repository and
        provide the repository URL for us to access.<br/>
        API ( Use New York Times API )<br/>
        URL : https://developer.nytimes.com<br/>
        ( you need to register and create the new API key before using it )<br/>
       </p>
    </Layout>
)
