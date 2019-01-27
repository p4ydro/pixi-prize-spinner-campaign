$('#skip-spin-button').click(function(e) {
    // Open download link based on respective OS
    switch (getMobileOperatingSystem()) {
        case "iOS":
            window.location.href = "https://itunes.apple.com/us/app/via-low-cost-ride-sharing/id657777015?mt=8";
        break;
        case "Android": // Fall through intended
        default:
            window.location.href = "https://play.google.com/store/apps/details?id=via.rider&hl=en_US";
        break;
    }
});

function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }
  
      return "unknown";
  }