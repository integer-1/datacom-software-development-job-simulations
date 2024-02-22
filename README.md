# 🎬 Cinema Finder Bug Fix Report 
<div style="text-align: right">Reported by Swuon @integer-1 <img></div>

### 1. Map Navigation Issue on Maplibre map library:

  - Bug : The map fails to snap to cinema features, resulting in an unexpected error message "Unexpected error while attempting map navigation", which impacts the overall map navigation experience.
  - Fix : According to the official documentation of Maplibre GL JS, the `center` property of the map.`flyTo` method should be passed in the format of `[lng, lat]`. <br> 
  Therefore, addressed the map navigation functionality to enable snapping to cinema features.
  - Reference : <a href = "https://maplibre.org/maplibre-gl-js/docs/API/#map#flyto">`flyTo` Method</a> / <a href = "https://maplibre.org/maplibre-gl-js/docs/API/classes/LngLat/">Class: LngLat</a>
  - Code solution : <br>
  In `MaplibreMap.jsx`, modify `line 34` as follows:

    <details style="padding-left: 2em">
        <summary>Here is the fixed code</summary>

    from 
    ```jsx
    map.flyTo({
      center: [lat, lng],
      zoom: 14,
    })
    ```
    to 
    ```jsx
    map.flyTo({
      center: [lng, lat],
      zoom: 14,
    })
    ```
    </details>
<br>


### 2. Leaflet Map Library Image Display Issue:

  - Bug : When selecting "Leaflet" as the active map library, map images fail to appear.
  - Fix : Resolve the problem of map images not appearing when Leaflet is chosen as the active map library. The issue was addressed by modifying the tile layer configuration to use a different URL for fetching map tiles.
  - Code solution : <br>
  In `LeafletMap.jsx`, modify `line 63` as follows:

    <details style="padding-left: 2em">
        <summary>Here is the fixed code</summary>

    from 
    ```jsx
    <TileLayer
      attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}"
      subdomains="abcd"
      minZoom={0}
      maxZoom={18}
      ext="png"
    />
    ```
    to 
    ```jsx
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      subdomains="abcd"
      minZoom={0}
      maxZoom={18}
      ext="png"
    />
    ```
    </details>
<br>

<br>
<br>

# Feature Improvement Fix Report 


### 1. User-Friendly Error Handling:

  - Feature Improvement : Users are unable to understand error messages. 
  - Fix : Revise error messages to be more user-friendly. For example, change "Unexpected error while attempting map navigation" to "We're sorry, but map navigation is currently unavailable."
  - Code solution :
<br>In `MaplibreMap.jsx`, modify `line 39`.
<br>In `LeafletMap.js`x, modify `line 31`.

    <details style="padding-left: 2em">
        <summary>Here is the fixed code</summary>
  
    from 
    ```jsx
    enqueueSnackbar( "Unexpected error while attempting map navigation", { variant: "error" })
    ```
    to 
    ```jsx
    enqueueSnackbar(
      "We are sorry, but map navigation is currently unavailable.",
      { variant: "error" }
    )
    ```
    </details>
<br>


### 2. User Interface (UI) Changes:
  - Feature Improvement : For computer users, clicking on the phone icon can not initiate a phone call.
  - Fix : For computer users, hovering over the IconButton containing the phone number will display the phone number without enabling direct phone call functionality. This change ensures a more user-friendly experience for computer users while maintaining the direct phone call functionality for mobile users.
  - Code solution : <br>
  In `CinemaListItem.jsx`,  as follows:

    <details style="padding-left: 2em">
        <summary>Here is the fixed code</summary>

    ```jsx
    import { useState } from "react"

    const CinemaListItem = ({
      name,
      lat,
      lng,
      phoneNumber,
      distance,
      ...otherProps
    }) => {
      const [showPhoneNumber, setShowPhoneNumber] = useState(false)

      return (
        <ListItem>
          <ListItemText>
            {name}
            {distance && (
              <Chip
                size="small"
                sx={{ ml: 1 }}
                label={`${format(",.1f")(distance)} km`}
              />
            )}
          </ListItemText>
          {phoneNumber && (
            <IconButton
              onMouseEnter={() => setShowPhoneNumber(true)}
              onMouseLeave={() => setShowPhoneNumber(false)}
              component="a"
              href={`tel:${phoneNumber}`}
            >
              <MdCall />
              {showPhoneNumber && (
                <span
                  style={{
                    position: "absolute",
                    marginBottom: "40px",
                    width: "300px",
                    fontSize: "13px",
                  }}
                >
                  {phoneNumber}
                </span>
              )}
            </IconButton>
          )}
          <IconButton onClick={() => dispatchMapSnapTo(lat, lng)}>
            <MdOutlineLocationOn />
          </IconButton>
        </ListItem>
      )
    }
    export default CinemaListItem


    ```
    </details>
