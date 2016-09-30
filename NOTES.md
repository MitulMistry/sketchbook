**To Do:**
!-recheck authorizations
-CSRF works with angular_rails_csrf gem, but if you logout then try to register again, you get an authenticity token error - doing a hard refresh on logout as a workaround
-css/less overriding for navbar
-devise user updating - change password / delete user
-sketch creation - tag_ids not being sent in proper format from SketchesService, temporarily fixed with back end sketches_controller check_tag_ids method
-profile page goes blank with a hard reload
-some pages don't properly refresh on a hard reload
-401 error from NavController Auth.currentUser() promise if not logged in, but doesn't cause a problem
-displaying errors doesn't always work

Avi:
-encapsulate #find_artist in Rails artists_controller - rename?
  current_user.is_owner?(@artist) instead of if @artist != current_user
-in Rails sketches_controller, move #check_tag_ids_if_hash and #check_tag_ids_if_nil to model, create some sort of custom update_tag_ids= setter method for [:sketch][:update_tag_ids]
-set Angular SketchesService create and update methods as callbacks (like: return $http.get('/sketches.json');), then do .then(function(response){ $state.go(...) }); under NewSketchController createSketch method, etc.

Done:
-edit/delete for images
-form validations
-get messages working
-truncate descriptions (limitTo)
-change color of tag button on sketches page when clicked
-controller errors and status codes
-bootstrap columns for grid (masonry style)
-pagination
-image validations in sketch model
-fix CSRF protection
-don't show tags in sketches screen if tag has no sketches
-profile route in app.js
-add angular route authorization for editArtist and editSketch

Future:
-write back end and front end tests
-refactor code - clean up - use $scope more instead of so many controller variables?
-switch to bootstrap 4 styling
-front end design + branding, art direction
-animated flash messages
-navbar scaling - responsive, hamburger button
-more repsonsive design
-front end animation
-comments + comment nesting?
  -upvoting/downvoting comments?
-likes for sketches (popularity?)
-artist profile images - avatars / page headers like twitter?
-back end api options - e.g. get sketch with comments or without comments - query string?
-use truncate.js for truncating text instead of limitTo?


X-get ui.bootstrap to work
X-add basic page routes
	-Not logged in:
		-login
		-register
	-Others:
		-home page - show all sketches - filter by tags
		-user show pages - profile + sketches
			-Your profile
		-user forms:
			-edit profile
		-sketch show pages
		-sketch forms:
			-new
			-edit + delete?

X-implement Devise


**Gems:**
-Devise
-Paperclip - for image uploading
-Bootstrap?

**Models:**
-devise User/Artist
	-username
	-first name
	-last name
	-has_many Sketches
	-has_many Comments

-Sketches
	-title
	-description
	-belongs_to User
	-has_many SketchTags
	-has_many Tags, through SketchTags

-Tags
	-title
	-has_many SketchTags
	-has_many Sketches, through SketchTags

-SketchTags
	-belongs_to Sketch
	-belongs_to Tag

-Comments
	-belongs_to Sketch
	-belongs_to User

Pages:
-splash page
-login
-register
-home - view all
-your sketches
-user/artist show page
-upload/create sketch
-Sketch show page
