# Cam O Genics Backend Application

<a href="https://cogc.kunalkeshan.dev/">
<p align="center">
<img src="/public/images/gh-thumbnail-backend.jpg" alt="CamOGenics GitHub Backend Thumbnail" width="60%" height="auto" />
</p>
</a>

**Table of Contents**:

- [About](#about)
- [Features](#features)
  - [Common Features](#common-features)
  - [CamOGenics Club Member](#camogenics-club-member)
  - [CamOGenics Community Member](#camogenics-community-member)
- [Endpoints Documentation](#endpoints-documentation)
- [Contributing](#contributing)
  - [Project Contributors](#project-contributors)
- [License](#license)

## About

Cam O Genics is the Photography and film Society of SRM IST Ramapuram. This project is the API implementation for the [Cam O Genics Native Application](https://github.com/surendar-pd/Cam-O-Genics-Native-App) that allows its community members to view and manage events, their members, and be updated with the club activity.

## Features

The backend application of Cam O Genics has many features, the can be narrowed down based on the club/community roles and the in-club roles assigned to a member.

### Common Features

- Open Signup and login for both Club and Community members.
- Signup with Club member with the CamOGenics Id only.
- Signup with Community member with official college email only.
- Login using either, email, password, or phone and password.
- Show off your profile with others, change your details with in-app profile settings.
- View Club events.
- Get Notifications and emails (conditionally) about club updates.

### CamOGenics Club Member

| Features/Roles | ADMIN | PRESIDENT | SECRETARY | MEMBER | ALUMNI |
| --- | :-: | :-: | :-: | :-: | :-: |
| Create Events | yes | yes | yes | no | no |
| Update Events | yes | yes | yes | no | no |
| Delete Events | yes | yes | yes | no | no |
| Add/Delete Community Identities | yes | yes | yes | no | no |
| Update Club Information | yes | yes | no | no | no |
| Update Own Profile | yes | yes | yes | yes | yes |
| Change ADMIN Role | yes | no | no | no | no |
| Change PRESIDENT Role | yes | yes | no | no | no |
| Change SECRETARY Role | yes | yes | yes | no | no |
| Change MEMBER Role | yes | yes | yes | no | no |
| Change ALUMNI Role | yes | yes | yes | no | no |

### CamOGenics Community Member

Mostly has only read-only access. Can update their own profile and open issues, queries and contact to the community.

## Endpoints Documentation

Refer to the [CamOGenics Backend App's Wiki](https://github.com/kunalkeshan/Cam-O-Genics-Backend/wiki) to learn more about the application endpoints.

## Contributing

To contribute to this project checkout the [CONTRIBUTING.md](/CONTRIBUTING.md) guidelines. Any feature addition, code improvement or documentation upgrades are welcomed!

### Project Contributors

Contributors who helped this project grow and improve!

<a href="https://github.com/kunalkeshan/Cam-O-Genics-Backend/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=kunalkeshan/Cam-O-Genics-Backend" />
</a>

## License

This project is licensed under the [MIT License](/LICENSE).

---

If you found this Project 🤯! Leave a ⭐, it helps the project become more visible to others.
