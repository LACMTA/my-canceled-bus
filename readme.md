# My Canceled Bus Tool

This tool presents our cancellation data in real time (updated every 5 minutes).

https://lacmta.github.io/my-canceled-bus/ - This page lists canceled trips in chronological order, by line.

https://lacmta.github.io/my-canceled-bus/dashboard.html - This page visualizes the number of trips cancelled for each line.

## Details

Cancelation data from the various bus Divisions (non-Contracted Services) is now being entered into HASTUS and the data is being exported to a JSON file every five minutes.  Contracted Services are entering their cancellations directly into the Swiftly dashboard.

This tool was inspired by the [SacRT Alerts Page](https://www.sacrt.com/alerts/tcalerts.aspx).

The raw data is published via the [Metro API](https://api.metro.net).

## To Do

* Publish a User Guide with details about each field.
* Test with users.
  * Show cancelation information by bus stop?
* Let folks know about this data.
