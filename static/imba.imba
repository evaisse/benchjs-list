extern getMovies
extern filterMovie


var movies = []


# def load
# 	state:movies = await getMovies()
# 	console.log state
# 	Imba.commit()

getMovies().then do |some|
	movies = some
	Imba.commit()

tag App < div

	prop stared default: false
	prop filter default: ""


	def addItem
		data.unshift(title: "a")

	def render 

		<self>
			<header>

				<h2> "Vue - {data:length} Movies"

					<div>
						<label> "Search : "
							<input[filter] type="text">

					<div>
						<label>
							<input[stared] type="checkbox"> "Only ★"

					<button :tap.addItem> "add"
			<table>
				<thead>
					<th css:width="80%"> "Title"
					<th css:width="10%"> "Rating"
					<th css:width="10%"> "Stared"

				<tbody> 
					for movie in data
						<tr> if filterMovie(movie, {filter: filter, stared: stared})
							<td> movie:title
							<td> movie:rating
							<td>
								<a :click=(do movie:stared = !movie:stared)> "{movie:stared ? "★" : "☆"}"


Imba.mount <div#app ->

	<App[movies]>


