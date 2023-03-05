using Photon.Pun;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using UnityEngine;

public class ValueManager : MonoBehaviour
{

    public string nickname;
    public int skin;


    public static ValueManager instance;
    private void Awake()
    {
        if (instance == null) instance = this;
        else if (instance != null) return;
        DontDestroyOnLoad(gameObject);
    }

    // Start is called before the first frame update
    void Start()
    {
        //셀렉트 창에서는 webgl 키보드 인풋 필요없고 react 핸드폰 인풋만 가능-> false로
        //ChatManager에서 다시 키보드 인풋 생기므로 거기서 다시 트루로 바꿈
        setUnityFalse();  
    }

    // Update is called once per frame
    void Update()
    {
        
    }
    public void setSkin(int skin)
    {
        this.skin = skin;
    }
    public void getNickname()
    {
        Debug.Log(nickname + "리턴");
        //return nickname;
    }
    public void getUserId(string user_id)
    {
        this.nickname= user_id;
        //Debug.Log($"유저 {user_id} 아이디 가져옴");
       
       // Debug.Log("이제 닉넴은 " + nickname);

    }

    public void setUnityFalse()
    {
      //  Debug.Log("유니티 키보드 입력 끔");
#if (UNITY_WEBGL == true && UNITY_EDITOR == false)
     WebGLInput . captureAllKeyboardInput = false ; 
#endif
    }

    public void setUnityTrue()
    {
       // Debug.Log("유니티 키보드 입력 킴");
#if (UNITY_WEBGL == true && UNITY_EDITOR == false)
     WebGLInput . captureAllKeyboardInput = true; 
#endif
    }
 

}
