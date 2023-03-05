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
        //����Ʈ â������ webgl Ű���� ��ǲ �ʿ���� react �ڵ��� ��ǲ�� ����-> false��
        //ChatManager���� �ٽ� Ű���� ��ǲ ����Ƿ� �ű⼭ �ٽ� Ʈ��� �ٲ�
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
        Debug.Log(nickname + "����");
        //return nickname;
    }
    public void getUserId(string user_id)
    {
        this.nickname= user_id;
        //Debug.Log($"���� {user_id} ���̵� ������");
       
       // Debug.Log("���� �г��� " + nickname);

    }

    public void setUnityFalse()
    {
      //  Debug.Log("����Ƽ Ű���� �Է� ��");
#if (UNITY_WEBGL == true && UNITY_EDITOR == false)
     WebGLInput . captureAllKeyboardInput = false ; 
#endif
    }

    public void setUnityTrue()
    {
       // Debug.Log("����Ƽ Ű���� �Է� Ŵ");
#if (UNITY_WEBGL == true && UNITY_EDITOR == false)
     WebGLInput . captureAllKeyboardInput = true; 
#endif
    }
 

}
