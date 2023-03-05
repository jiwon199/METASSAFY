using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Cinemachine;
using Photon.Pun;

public class CameraSetup : MonoBehaviourPun
{
    public float speed = 10.0f;
    public Transform cameraTrarget;

    private CinemachineVirtualCamera followCam;
    private Vector3 worldDefalutForward;
    private const int zoomSpeed = 50;

    private bool view = false;

    private Vector3 headPosition;

    // Start is called before the first frame update
    void Start()
    {
        if (photonView != null)
        {
            //내가 로컬 플레이어일까?
            if (photonView.IsMine)
            {
                // 씬에 있는 시네머신 가상 카메라를 찾고
                followCam =
                    FindObjectOfType<CinemachineVirtualCamera>();
                // 가상 카메라의 추적 대상을 자신의 트랜스폼으로 변경
                followCam.Follow = transform.Find("CamPivot").transform;
                followCam.LookAt = transform.Find("CamPivot").transform;
                //worldDefalutForward = transform.Find("CamPivot").transform.forward;
            }
        }

    }

    // Update is called once per frame
    void Update()
    {
        // 로컬 플레이어
        if (photonView.IsMine)
        {
            if (!view)
            {
                float scroll = Input.GetAxis("Mouse ScrollWheel") * speed * -1;

                //최대 줌인
                if (followCam.m_Lens.FieldOfView <= 10.0f && scroll < 0)
                {
                    followCam.m_Lens.FieldOfView = 10.0f;
                }

                // 최대 줌 아웃
                else if (followCam.m_Lens.FieldOfView >= 100.0f && scroll > 0)
                {
                    followCam.m_Lens.FieldOfView = 100.0f;
                }

                // 줌인 아웃 하기.
                else
                {
                    followCam.m_Lens.FieldOfView += scroll;
                }
            }
        }
    }
}
