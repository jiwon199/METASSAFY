using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Photon.Pun;
using Unity.VisualScripting;
using UnityEngine.SceneManagement;
using UnityStandardAssets.Utility;
using Photon.Realtime;

public class Launcher : MonoBehaviourPunCallbacks
{
    public PhotonView [] playerPrefabs;
    public GameObject loading;
 
    void Start()
    {
        loading.SetActive(true);
        Debug.Log("launcher 실행");
        
        PhotonNetwork.ConnectUsingSettings();
    }
     
    public override void OnConnectedToMaster()
    {
        Debug.Log("방에 접속하는 중..");
      
        if (SceneManager.GetActiveScene().name == "Lobby")
        {
            Debug.Log("로비 연결..");
            PhotonNetwork.JoinOrCreateRoom("Lobby", null, null);
        }
        else if(SceneManager.GetActiveScene().name == "Gumi")
        {
            Debug.Log("구미 연결..");
            PhotonNetwork.JoinOrCreateRoom("Gumi", null, null);
        }
        else if (SceneManager.GetActiveScene().name=="Seoul")
        {
            PhotonNetwork.JoinOrCreateRoom("Seoul", null, null);
        }
        else if (SceneManager.GetActiveScene().name == "BUK")
        {
            PhotonNetwork.JoinOrCreateRoom("BUK", null, null);
        }
        else
        {
            PhotonNetwork.JoinOrCreateRoom("Lobby", null, null); 
        }
    }
    public override void OnJoinedRoom()
    {
        Debug.Log("룸 참가 성공");
       
        loading.SetActive(false);
        int skin;
        if (GameObject.Find("ValueManager") != null)
            skin = GameObject.Find("ValueManager").GetComponent<ValueManager>().skin;
        else
            skin = 0;
         
        GameObject p= PhotonNetwork.Instantiate(playerPrefabs[skin].name, Vector3.zero, Quaternion.identity);
       
        Transform t = p.GetComponent<Transform>();
       // GameObject.Find("Main Camera").GetComponent<SmoothFollowCam>().target = t.Find("CamPivot").transform;

        //이름을 붙인다.
        setNickName(t);
   
    }
    public void setNickName(Transform t)
    {
        string name;
        if (GameObject.Find("ValueManager") != null)
            name = GameObject.Find("ValueManager").GetComponent<ValueManager>().nickname;
        else
            name = "익명";

        PhotonNetwork.LocalPlayer.NickName = name;
    }

     

}
