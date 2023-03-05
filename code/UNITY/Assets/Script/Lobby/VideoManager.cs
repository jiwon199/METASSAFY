using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Video;

public class VideoManager : MonoBehaviour
{
    VideoPlayer videoPlayer;
    // Start is called before the first frame update
    void Start()
    {
        videoPlayer = GetComponent<VideoPlayer>();
        videoPlayer.url = System.IO.Path.Combine(Application.streamingAssetsPath, "ssafy_video.webm");
        videoPlayer.Pause();
        /*videoPlayer.Play();
        videoPlayer.SetDirectAudioMute(0, true);*/
    }


}
