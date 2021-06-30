class AdSkipper{
    
    constructor(){
        this.video = null;
    }

    SkipAd(){
        this.video = this.FindVideoElement();
        
        if(!this.video){
            return;
        }
            
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

        console.log(videos);
    
        return [...videos]
            .find(v => this.IsElementVisible(v) && !Number.isNaN(v.duration));
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
    
    IsElementVisible(element){
        var rect = element.getBoundingClientRect();
        var elemTop = rect.top;
        var elemBottom = rect.bottom;

        var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
        return isVisible;
    }
}

chrome.runtime.onMessage.addListener(handleMessage);

var addSkipper = new AdSkipper();

function handleMessage(){
    addSkipper.SkipAd();
}






