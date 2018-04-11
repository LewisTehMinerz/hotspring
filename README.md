<!-- HTML Start -->
<h1 align="center">hotspring</h1>
<p align="center">
    <a href="https://circleci.com/gh/LewisTehMinerz/hotspring">
        <img alt="circleci" src="https://img.shields.io/circleci/project/github/LewisTehMinerz/hotspring.svg?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAFAAAABQBXIyBfAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAETSURBVCiRlZLPKkVRGMV/+yQTKXfkBdw8gu6AjAyQMvMYklLcugZSRgYyIyYyMpNkRhkwMZTyBLrcGPhzo5+BfWp3nKOs4W6ttde3vg8SqMPqlnqnvqnP6rXaVGuUQV1Su1bjUZ0qitb+EKT4VKcBgjoKnAMh+nSBA+ACqAEzwHjyTweoo54mju/qWCFNiDOmWA3qLtAfeSchhH11EFgB2sBGTHEJNCLvpqqow8R9ISkvx0tWqixHyrVH3QP64sNZCGEHmAceYtRtNQNmE+E96nES4UOdKMTO1PVCOa2gNuLg+Tq+gCN+VtQLzAEjidcTUM9dW/84gF/XsxijVqGtTpbWpg6pm+qt+qp21Ct1WR1Iud9rHH2qChMm7QAAAABJRU5ErkJggg==">
    </a>
    <a href="https://codeclimate.com/github/LewisTehMinerz/hotspring/maintainability">
        <img alt="maintainability" src="https://img.shields.io/codeclimate/maintainability/LewisTehMinerz/hotspring.svg?style=for-the-badge">
    </a>
    <a href="https://github.com/semantic-release/semantic-release">
        <img alt="semantic-release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=for-the-badge">
    </a>
</p>
<!-- HTML End -->

hotspring is a library for communicating with databases.

### Why?
I wanted a library that simply just allowed me to communicate with multiple databases, each with a slightly different, but mostly similar API. hotspring is meant to do this. It's a library with an easy way to add more databases, simply by extending the generic classes and implementing the needed functions.

### Supported Databases
- JSON
    - While this is technically not a database, and more of a way to store data, it is the first implementation of a hotspring database.