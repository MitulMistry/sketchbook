**To Do:**
-add angular route authentication for editArtist and editSketch
-fix CSRF protection
-css/less overriding

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
