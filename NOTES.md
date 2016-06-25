**To Do:**
-add angular route authentication for editArtist and editSketch
-recheck authentications
-image validations in sketch model
-fix CSRF protection
-css/less overriding for navbar
-devise user updating - change password / delete user
-sketch creation - tag_ids not being sent in proper format from SketchesService, temporarily fixed with back end sketches_controller check_tag_ids method
-profile route in app.js
-don't show tags in sketches screen if tag has no sketches

Done:
-edit/delete for images
-form validations
-get messages working
-truncate descriptions (limitTo)
-change color of tag button on sketches page when clicked
-controller errors and status codes
-bootstrap columns for grid (masonry style)
-pagination

Future:
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
