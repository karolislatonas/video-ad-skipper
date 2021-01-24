class AdSkipper{
    
    constructor(){
        this.video = null;
    }

    SkipAd(){
        this.video = this.FindVideoElement();
        
        this.video.onloadedmetadata = this.OnVideoChange.bind(this);
        
        this.OnVideoChange();
    }

    OnVideoChange(){
        this.video.currentTime = this.video.duration + 1;
    }
    
    FindVideoElement(){
        var videos = document.getElementsByTagName('video');
    
        if(videos.length === 0){
            videos = this.FindVideoElementInIFrames();
        }
    
        return videos[0];
    }

    FindVideoElementInIFrames(){
        var iframes = document.getElementsByTagName('iframe');
            
        var iframesArray = [...iframes];

        var videos = iframesArray
            .map(f => f.contentDocument)
            .filter(d => d !== null)
            .map(d => d.getElementsByTagName('video'))
            .filter(v => v !== null)
            .filter(v => v.length > 0)

        return videos[0];
    }
}

chrome.runtime.onMessage.addListener(handleMessage);

var addSkipper = new AdSkipper();

function handleMessage(){
    addSkipper.SkipAd();
}






