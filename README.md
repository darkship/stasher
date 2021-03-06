A JavaScript client for Atlassian Stash's REST API, utilizing
Promises.

### Installation

From [npm](https://www.npmjs.com/package/stasher):

```
npm install stasher
```

The library and its dependencies are compatible with
[browserify](http://browserify.org/).

### Usage

All API methods return [Promises/A+](https://promisesaplus.com/)
compatible promises via
[Bluebird](https://github.com/petkaantonov/bluebird).


```javascript
let stasher = require('stasher')

let client = new stasher.Client({
  base_url: 'http://dockerhost:32833/stash',
  auth: {
    type: stash.AuthType.BASIC,
    username: 'user',
    password: 'pass'
  }
})

function log(data) {
  console.log('----------')
  console.log(data)
}

client.projects.get()
  .then(log)

client.projects.get('PROJ')
  .then((project) => {
    return project.repositories()
  })
  .then(log)

client.repositories.get('PROJ', 'awesome-service')
  .then((repo) -> {
    return repo.pull_requests()
  })
  .then(log)
```

### Current Status

Work in progress.

* [ ] Error handling
* [ ] OAuth
* [ ] [Core API](https://developer.atlassian.com/static/rest/stash/3.9.2/stash-rest.html)
  * [ ] Projects
    * [x] `GET /rest/api/1.0/repos`
    * [x] `GET /rest/api/1.0/projects`
    * [x] `GET /rest/api/1.0/projects/{key}`
    * [x] `GET /rest/api/1.0/projects/{key}/repos`
    * [x] `GET /rest/api/1.0/projects/{key}/repos/{repo}`
    * [x] `GET /rest/api/1.0/projects/{key}/repos/{repo}/tags`
    * [ ] `GET /rest/api/1.0/projects/{key}/repos/{repo}/forks`
    * [x] `GET /rest/api/1.0/projects/{key}/repos/{repo}/related`
    * [x] `GET /rest/api/1.0/projects/{key}/repos/{repo}/branches`
    * [x] `GET /rest/api/1.0/projects/{key}/repos/{repo}/branches/default`
    * [x] `GET /rest/api/1.0/projects/{key}/repos/{repo}/browse`
    * [x] `GET /rest/api/1.0/projects/{key}/repos/{repo}/browse/{path}`
    * [x] `GET /rest/api/1.0/projects/{key}/repos/{repo}/changes`
    * [x] `GET /rest/api/1.0/projects/{key}/repos/{repo}/commits`
    * [x] `GET /rest/api/1.0/projects/{key}/repos/{repo}/commits/{id}`
    * [x] `GET /rest/api/1.0/projects/{key}/repos/{repo}/commits/{id}/changes`
    * [ ] `GET /rest/api/1.0/projects/{key}/repos/{repo}/commits/{id}/comments`
    * [x] `GET /rest/api/1.0/projects/{key}/repos/{repo}/files`
    * [x] `GET /rest/api/1.0/projects/{key}/repos/{repo}/pull-requests`
    * [x] `GET /rest/api/1.0/projects/{key}/repos/{repo}/pull-requests/{id}`
    * [ ] `GET /rest/api/1.0/projects/{key}/repos/{repo}/pull-requests/{id}/activities`
    * [x] `GET /rest/api/1.0/projects/{key}/repos/{repo}/pull-requests/{id}/changes`
    * [ ] `GET /rest/api/1.0/projects/{key}/repos/{repo}/pull-requests/{id}/comments`
    * [x] `GET /rest/api/1.0/projects/{key}/repos/{repo}/pull-requests/{id}/commits`
    * [ ] `GET /rest/api/1.0/projects/{key}/repos/{repo}/pull-requests/{id}/diff`
    * [ ] `GET /rest/api/1.0/projects/{key}/repos/{repo}/pull-requests/{id}/participants`
  * [x] Profile
    * [x] `GET /rest/api/1.0/profile/recent/repos`
  * [x] Users
    * [x] `GET /rest/api/1.0/users`
    * [x] `GET /rest/api/1.0/users/{slug}`
* [ ] [Build Integration API](https://developer.atlassian.com/static/rest/stash/3.9.2/stash-build-integration-rest.html)
