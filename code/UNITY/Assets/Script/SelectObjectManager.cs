 
using Photon.Pun;
using Photon.Pun.UtilityScripts;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using Unity.VisualScripting;
using Unity.VisualScripting.Antlr3.Runtime;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.SceneManagement;
using UnityEngine.Video;


public class SelectObjectManager : MonoBehaviourPunCallbacks, IDragHandler
{

    [DllImport("__Internal")]
    private static extern void openPhone(string mode);
    Vector3 m_vecMouseDownPos;

    //Boolean isRoomInfoOpen = true; //잠시 바꿈
    public GameObject tree;
    public GameObject popup;
    public VideoPlayer my_video;
    
    void Update()
    {

        ClickEvent();
       // PressEvent();

    }
    float distance = 10.0f;
    public void OnDrag(PointerEventData eventData)
    {
        Debug.Log("onDrag 호출");
        Vector3 mousePosition = new Vector3(Input.mousePosition.x,
                Input.mousePosition.y, distance);
        transform.position = mousePosition;
    }

    void ClickEvent()
    {

        // 마우스 클릭 시
        if (Input.GetMouseButtonDown(0))
        {
            // Debug.Log("클릭이벤트 발생: "+photonView.ViewID);
            if (EventSystem.current.IsPointerOverGameObject())
                return;
            m_vecMouseDownPos = Input.mousePosition;

            // 카메라에서 스크린에 마우스 클릭 위치를 통과하는 광선을 반환합니다.
            Ray ray = Camera.main.ScreenPointToRay(m_vecMouseDownPos);
            RaycastHit hit;

            // 광선으로 충돌된 collider를 hit에 넣습니다.
            if (Physics.Raycast(ray, out hit, 20.0f))
            {
                
                if (hit.collider.name == "GumiCam")
                    goToRoom("Gumi");
                if(hit.collider.name== "SeoulCam")
                {
                    goToRoom("Seoul");
                }
                if (hit.collider.name == "GoLobby")
                {
                    goToRoom("WorldMap");
                }
                if (hit.collider.name == "부울경")
                {
                    goToRoom("BUK");
                }
                /*if (hit.collider.name == "대전")
                {
                    goToRoom("Daejeon");
                }*/
                if (hit.collider.name == "board")
                {
                    clickBoard();
                }
                if (hit.collider.name=="광주" || hit.collider.name == "대전")
                {
                    popup.SetActive(true);
                }
                if (hit.collider.name == "tree")
                {
                    // GameObject tree= GameObject.FindGameObjectWithTag("tree");
                    tree.SetActive(true);
                }
                if (hit.collider.tag == "Player")
                {
                    GameObject hitTarget = hit.collider.gameObject;
                    // Debug.Log(hitTarget.GetComponentInChildren<TextMesh>().text);
                    name = hitTarget.GetComponentInChildren<TextMesh>().text;
                    clickUser();
                }
                if (hit.collider.name == "VideoPlane")
                {
                    playVideo();
                }
                if (hit.collider.name == "record") {
                    Debug.Log(hit.collider.name);
                    playMusic();
                }
                

            }

        }
    }
    //공사중 팝업 없앰
    public void canclePopup()
    {
        popup.SetActive(false);
    }
    public void cancleTree()
    {
        //GameObject tree = GameObject.FindGameObjectWithTag("tree");
        tree.SetActive(false);
    }
    public void goToRoom(string name)
    {

        //모든 플레이어 중에서
        GameObject[] players = GameObject.FindGameObjectsWithTag("Player");
        for (int i = 0; i < players.Length; i++)
        {    //이동한 애(=자기 자신)을 네트워크에서 끊고 
            if (players[i].GetComponent<PhotonView>().IsMine)
            {
                PhotonNetwork.Disconnect();
            }
        }
        //씬 이동
        SceneManager.LoadScene(name);

    }

    void playVideo()
    {
        if (my_video != null)
        {
            if (my_video.isPlaying)
            {
                //Debug.Log(my_video.GetDirectAudioMute(0));
                my_video.Pause();
            }
            else
            {
                //Debug.Log(my_video.GetDirectAudioMute(0));
                //my_video.SetDirectAudioMute(0, true);
                my_video.Play();
            }
        }
    }
 
    public void enterVideo(string RoomName)
    {
        //리액트 측에 비디오라는 메세지 보내기
#if UNITY_WEBGL == true && UNITY_EDITOR == false
    openPhone (RoomName);
#endif
    }

    public void clickPhone()
    {

#if UNITY_WEBGL == true && UNITY_EDITOR == false
    openPhone ("phone");
#endif
    }

    public void clickUser()
    {

#if UNITY_WEBGL == true && UNITY_EDITOR == false
    openPhone (name);
#endif
    }

    public void clickBoard() {
#if UNITY_WEBGL == true && UNITY_EDITOR == false
    openPhone ("board");
#endif
    }

    public void playMusic() {
        /*
        #if UNITY_WEBGL == true && UNITY_EDITOR == false
            openPhone ("music");
        #endif
        */
       

    }

}