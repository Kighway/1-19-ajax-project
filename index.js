$(document).ready(function () {

    $('select').material_select() //option to add materialize styling to select and show drop down bar

    $('form#industry').submit(onSubmit)

    function onSubmit(event) {
      event.preventDefault()
      findVenue()
    }

    function findVenue () {
      const URL = "https://data.cityofnewyork.us/resource/2pc8-n4xe.json"

      $.ajax({
      url: URL,
      success: renderVenues
    })
  }

  function renderVenues (results) {
    let $input = $('#choice :selected')
    let subindustry = $input.text()
    let resultList = $('ul#results')
    resultList.html('')
    $input.val('')
    results.forEach( function (venue) {
      if (venue['subindustry'] === subindustry )
          resultList.append(`<li class='collection-item'>${linkCreator(venue)}</li>`)
    })
  }
  function linkCreator(oneVenue) {
    if (oneVenue['website']) {
      if (oneVenue['website'][0] === "h") {
        return `<a href="${oneVenue['website']}" target="_blank">${oneVenue['company_name']}</a>`
      }
      else {
        return `<a href="http://${oneVenue['website']}" target="_blank">${oneVenue['company_name']}</a>`
      }
    }
    else {
      return oneVenue['company_name']
    }
  }




  })
